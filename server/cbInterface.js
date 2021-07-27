const couchbase = require('couchbase');
const dotenv = require('dotenv');
dotenv.config();

const initConnection = () => {
  const cluster = await couchbase.connect('couchbase://localhost', {
    username: process.env.COUCH_USER,
    password: process.env.COUCH_PASS
  });
  const reviewsColl = cluster.bucket('rpt27-sdc-websockets-reviews').defaultCollection();
  const reviewersColl = cluster.bucket('rpt27-sdc-websockets-reviewers').defaultCollection();

  return {
    reviewsColl,
    reviewersColl
  };
};

const { reviewsColl, reviewersColl } = initConnection();

const getReviews = async (courseId) => {
  const result = await reviewsColl.get(`${courseId}`);
  const document = result.value;
  return document;
};

const getReviewers = async (reviews) => {
  const reviewers = reviews.map(review => review.reviewer);
  const query = `
  SELECT * FROM \`rpt27-sdc-websockets-reviewers\`
  WHERE reviewer IN $1
  `;
  const options = { parameters: [reviewers] };

  try {
    const result = await reviewersColl.query(query, options);
    console.log("=== result ===>", result);
    return result;
  } catch (error) {
    console.error('Query failed: ', error);
  }
};

module.exports.getCourseReviewsAndRatings = async (courseId) => {
  const {ratings, reviews} = await getReviews(courseId);
  const reviewers = await getReviewers(reviews);
  const reviewerObj = reviewers.reduce((memo, reviewer) => {
    memo[reviewer.reviewerId] = reviewer;
    return memo;
  }, {});
  const reviewsAndReviewers = reviews.map(review => {
    review.reviewer = reviewerObj[review.reviewer];
    return review;
  });

  return {
    courseId,
    ratings,
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
  SELECT * FROM \`rpt27-sdc-websockets-reviews\` reviews
  UNNEST reviews.reviews AS r
  WHERE reviews.courseId = $1
  AND r.reviewerId = $2
  `;
  const options = { parameters: [courseId, reviewerId] };

  try {
    const result = await reviewsColl.query(query, options);
    console.log("=== result ===>", result);
    return result;
  } catch (error) {
    console.error('Query failed: ', error);
  }
};

module.exports.addReviewForCourse = async (courseId, review, reviewer) => {
  try {
    const result = await reviewsColl.mutateIn(`${courseId}`, [
      couchbase.MutateInSpec.arrayAppend('reviews', review),
    ]);
  } catch(err) {
    console.error('error adding review to course =>', err);
  }

  try {
    const result = await collection.upsert(`${reviewer.reviewerId}`, reviewer,
      { timeout: 10000 }
    );
  } catch(err) {
    console.error('error adding reviewer =>', err);
  }
};






