const couchbase = require('couchbase');
const dotenv = require('dotenv');
dotenv.config();

const cluster = new couchbase.Cluster('couchbase://localhost', {
  username: 'admin',
  password: '$Packed98',
});
const reviewsColl = cluster.bucket('rpt27-sdc-websockets-reviews').defaultCollection();
const reviewersColl = cluster.bucket('rpt27-sdc-websockets-reviewers').defaultCollection();

const getReviews = async (courseId) => {
  const result = await reviewsColl.get(`${courseId}`);
  const document = result.value;
  return document;
};

const getReviewers = async (reviews) => {
  const reviewers = reviews.map(review => review.reviewer);
  const query = `
  SELECT * FROM \`rpt27-sdc-websockets-reviewers\` a
  WHERE META(a).id IN $1
  `;
  const options = { parameters: [reviewers] };

  try {
    const result = await cluster.query(query, options);
    return result.rows;
  } catch (error) {
    console.error('Query for getReviewers failed: ', error);
  }
};

const num2Word = (num) => {
  const map = {
    '5': 'five',
    '4.5': 'fourhalf',
    '4': 'four',
    '3.5': 'threehalf',
    '3': 'three',
    '2.5': 'twohalf',
    '2': 'two',
    '1.5': 'onehalf',
    '1': 'one'
  };
  return map[num];
};
const mapKeys = (ratings) => {
  const newRatings = {};
  const map = {
    'five': '5',
    'fourhalf': '4 1/2',
    'four': '4',
    'threehalf': '3 1/2',
    'three': '3',
    'twohalf': '2 1/2',
    'two': '2',
    'onehalf': '1 1/2',
    'one': '1'
  };
  for (let key in ratings) {
    if (map[key]) {
      newRatings[map[key]] = ratings[key];
    } else {
      newRatings[key] = ratings[key];
    }
  }
  return newRatings;
};

module.exports.getCourseReviewsAndRatings = async (courseId) => {
  const {ratings, reviews} = await getReviews(courseId);
  const newRating = mapKeys(ratings);
  const reviewers = await getReviewers(reviews);
  const reviewerObj = reviewers.reduce((memo, reviewer) => {
    memo[reviewer.a.reviewerId] = reviewer.a;
    return memo;
  }, {});
  const reviewsAndReviewers = reviews.map(review => {
    review.reviewer = reviewerObj[review.reviewer];
    return review;
  });

  return {
    courseId,
    ratings: newRating,
    reviews: reviewsAndReviewers
  };
};

module.exports.getReviewerById = async (reviewerId) => {
  const result = await reviewersColl.get(`${reviewerId}`);
  const document = result.value;
  return document;
};

module.exports.getReviewByReviewerIdAndCourseId = async (courseId, reviewerId) => {
  const query = `
  SELECT r.* FROM \`rpt27-sdc-websockets-reviews\` a
  UNNEST a.reviews AS r
  WHERE a.courseId = ${courseId}
  AND r.reviewer = ${reviewerId}
  LIMIT 1
  `;

  try {
    const result = await cluster.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Query failed: ', error);
  }
};

module.exports.addReviewForCourse = async (review) => {
  const courseId = review.courseId;
  const reviewer = review.reviewer;
  if (reviewer.reviewerId) {
    review.reviewer = reviewer.reviewerId;
  }

  try {
    const result = await reviewsColl.mutateIn(`${courseId}`, [
      couchbase.MutateInSpec.arrayAppend('reviews', review),
    ]);
    const ratingResult = await reviewsColl.lookupIn(`${courseId}`, [
      couchbase.LookupInSpec.get('ratings'),
    ]);
    let docRating = ratingResult.content[0].value;
    docRating.totalRatings = docRating.totalRatings + 1;
    docRating.totalStars = docRating.totalStars + review.rating;
    docRating.overallRating = docRating.totalStars / docRating.totalRatings;
    docRating[num2Word(review.rating)] = docRating[num2Word(review.rating)] + 1;
    const ratingUpdateResult = await reviewsColl.mutateIn(`${courseId}`, [
      couchbase.MutateInSpec.replace('ratings', docRating),
    ]);
  } catch(err) {
    console.error('error adding review to course =>', err);
  }

  if (reviewer.reviewerId) {
    try {
      const result = await reviewersColl.upsert(`${reviewer.reviewerId}`, reviewer,
        { timeout: 10000 }
      );
    } catch(err) {
      console.error('error adding reviewer =>', err);
    }
  }

  return review;
};

module.exports.updateReviewer = async (reviewer) => {
  const query = `
    UPDATE \`rpt27-sdc-websockets-reviewers\` a
    SET coursesTaken = coursesTaken + 1
    WHERE META(a).id = '${reviewer.reviewerId}'
  `;

  try {
    const result = await cluster.query(query);
    return result;
  } catch (err) {
    console.error('Query failed: ', err);
  }
};

module.exports.deleteReview = async (courseId, review) => {
  const query = `
    UPDATE \`rpt27-sdc-websockets-reviews\`
    USE KEYS "${courseId}"
    SET reviews = ARRAY a FOR a IN reviews WHEN a.comment <> "${review.comment}" END
    RETURNING reviews;
  `;

  try {
    const result = await cluster.query(query);

    const ratingResult = await reviewsColl.lookupIn(`${courseId}`, [
      couchbase.LookupInSpec.get('ratings'),
    ]);
    let docRating = ratingResult.content[0].value;
    docRating.totalRatings = docRating.totalRatings - 1;
    docRating.totalStars = docRating.totalStars - review.rating;
    docRating.overallRating = docRating.totalStars / docRating.totalRatings;
    docRating[num2Word(review.rating)] = docRating[num2Word(review.rating)] - 1;
    const ratingUpdateResult = await reviewsColl.mutateIn(`${courseId}`, [
      couchbase.MutateInSpec.replace('ratings', docRating),
    ]);

    return result;
  } catch (err) {
    console.error('Query failed: ', err);
  }
};
