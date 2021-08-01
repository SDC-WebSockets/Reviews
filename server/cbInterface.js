const couchbase = require('couchbase');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const cluster = new couchbase.Cluster('couchbase://localhost', {
  username: process.env.COUCH_USER,
  password: process.env.COUCH_PASS,
});
const reviewsColl = cluster.bucket('rpt27-sdc-websockets-reviews').defaultCollection();
const reviewersColl = cluster.bucket('rpt27-sdc-websockets-reviewers').defaultCollection();
const coursesColl = cluster.bucket('rpt27-sdc-websockets-courses').defaultCollection();

const getCourses = async (courseId) => {
  const result = await coursesColl.get(`${courseId}`);
  const document = result.value;
  return document;
};

const getReviews = async (courseId) => {
  const query = `
    SELECT * FROM \`rpt27-sdc-websockets-reviews\`
    WHERE courseId = ${courseId}
  `;

  try {
    const result = await cluster.query(query);
    return result.rows.map(row => row['rpt27-sdc-websockets-reviews']);
  } catch (err) {
    console.error('Query for getReviews failed: ', err);
  }
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
  const { ratings } = await getCourses(courseId);
  const newRating = mapKeys(ratings);
  const reviews = await getReviews(courseId);
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
  SELECT * FROM \`rpt27-sdc-websockets-reviews\`
  WHERE courseId = ${courseId}
  AND reviewer = ${reviewerId}
  LIMIT 1
  `;

  try {
    const result = await cluster.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Query failed: ', error);
  }
};

module.exports.addReviewForCourse = async (review, reviewer) => {
  const courseId = review.courseId;

  try {
    let rating = getCourses(courseId);
    const key = crypto.createHash('md5').update(`course${courseId}_review${rating.totalRatings + 1}`).digest('hex');
    review.reviewId = key;
    const result = await reviewsColl.insert(key, review);

    rating.totalRatings = rating.totalRatings + 1;
    rating.totalStars = rating.totalStars + review.rating;
    rating.overallRating = rating.totalStars / rating.totalRatings;
    rating[num2Word(review.rating)] = rating[num2Word(review.rating)] + 1;
    const courseResult = await coursesColl.insert(courseId, rating);

    if (reviewer) {
      const reviewerResult = await reviewersColl.insert(reviewer.reviewerId, reviewer);
    } else {
      reviewer = await reviewersColl.get(review.reviewer);
      reviewer.reviewCounts++;
      reviewer.coursesTaken++;
      const reviewerResult = await reviewersColl.insert(reviewer.reviewerId, reviewer);
    }

  } catch(err) {
    console.error('error adding review to course =>', err);
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
    DELETE FROM \`rpt27-sdc-websockets-reviews\`
    WHERE courseId = ${courseId}
    AND reviewer = ${review.reviewer}
    LIMIT 1
  `;

  try {
    const result = await cluster.query(query);

    let reviewer = reviewersColl.get(review.reviewer);
    reviewer.coursesTaken--;
    reviewer.reviewCounts--;
    const reviewerResult = await reviewersColl.insert(reviewer.reviewerId, reviewer);

    let rating = coursesColl.get(courseId);
    rating.totalRatings--;
    rating.totalStars = rating.totalStars - review.rating;
    rating.overallRating = rating.totalStars / rating.totalRatings;
    const courseResult = await coursesColl.insert(courseId, rating);

    return result.rows;
  } catch (err) {
    console.error('Query for getReviews failed: ', err);
  }
};
