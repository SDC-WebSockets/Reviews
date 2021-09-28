const { sequelize, Reviews, Reviewers, Ratings } = require('../database/postgres.js');
const crypto = require('crypto');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  database: 'udemy_reviews',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on postgres client', err)
  process.exit(-1)
});


const _num2Word = (num) => {
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

const _mapKeys = (ratings) => {
  const newRatings = ratings;
  newRatings['1 1/2'] = ratings['onehalf'];
  newRatings['2 1/2'] = ratings['twohalf'];
  newRatings['3 1/2'] = ratings['threehalf'];
  newRatings['4 1/2'] = ratings['fourhalf'];
  delete newRatings['onehalf'];
  delete newRatings['twohalf'];
  delete newRatings['threehalf'];
  delete newRatings['fourhalf'];
  return newRatings;
};

const _getCourse = async (courseId) => {
  const course = await Ratings.findByPk(courseId);
  if (course === null) {
    console.log(`course ${courseId} does not exist`);
  } else {
    return course.dataValues;
  }
};

const _getReviews = async (courseId) => {
  const reviews = await Reviews.findAll({
    where: {
      courseId
    }
  });
  if (reviews === null) {
    console.log(`reviews for course ${courseId} do not exist`);
  } else {
    const filteredReviews = reviews.map(review => review.dataValues);
    return filteredReviews;
  }
};

const _getReviewers = async (reviews) => {
  const courseId = reviews[0].courseId;
  const reviewerOrs = reviews.map(review => review.reviewer);
  const reviewers = await Reviewers.findAll({
    where: {
      reviewerId: reviewerOrs
    }
  });
  if (reviewers === null) {
    console.log(`reviewers for course ${courseId} do not exist`);
  } else {
    const filteredReviewers = reviewers.map(reviewer => reviewer.dataValues);
    return filteredReviewers;
  }
};

const _getDataWithFormat = async (courseId) => {
  const data = await pool
    .connect()
    .then(client => {
      return client.query(`
      SELECT ratings."courseId" AS "courseId",
      jsonb_build_object(
        'overallRatings', ratings."overallRatings",
        'totalStars', ratings."totalStars",
        'totalRatings', ratings."totalRatings",
        '5', ratings.five,
        'fourhalf', ratings.fourhalf,
        '4', ratings.four,
        'threehalf', ratings.threehalf,
        '3', ratings.three,
        'twohalf', ratings.twohalf,
        '2', ratings.two,
        'onehalf', ratings.onehalf,
        '1', ratings.one
      ) AS ratings,
      jsonb_agg(jsonb_build_object(
        'id', reviews.id,
        'courseId', reviews."courseId",
        'rating', reviews.rating,
        'comment', reviews.comment,
        'createdAt', reviews."createdAt",
        'helpful', reviews.helpful,
        'reported', reviews.reported,
        'reviewer', jsonb_build_object(
          'reviewerId', reviewers."reviewerId",
          'name', reviewers.name,
          'picture', reviewers.picture,
          'coursesTaken', reviewers."coursesTaken",
          'reviews', reviewers.reviews
        )
      )) AS reviews
      FROM ratings INNER JOIN reviews
      ON ratings."courseId" = reviews."courseId"
      INNER JOIN reviewers
      ON reviews.reviewer = reviewers."reviewerId"
      WHERE ratings."courseId" = ${courseId}
      GROUP BY ratings."courseId", ratings."overallRatings", ratings."totalStars",
      ratings."totalRatings", ratings.five, ratings.fourhalf, ratings.four,
      ratings.threehalf, ratings.three, ratings.twohalf, ratings.two,
      ratings.onehalf, ratings.one;
      `)
      .then(res => {
        client.release();
        return res.rows[0];
      })
      .catch(err => {
        client.release();
        console.log('error with postgres query', err);
      });
    });
  return data;
};

const getAllCourseContent = async (courseId) => {
  const course = await _getDataWithFormat(courseId);
  course.ratings = _mapKeys(course.ratings);
  return course;
};

const getReviewerById = async (reviewerId) => {
  const reviewer = await Reviewers.findByPk(reviewerId);
  if (reviewer === null) {
    console.log(`Reviewer ${reviewerId} does not exist`);
  } else {
    return reviewer.dataValues;
  }
};

const getReviewById = async (reviewId) => {
  const review = await Reviews.findByPk(reviewId);
  if (review === null) {
    console.log(`Review ${reviewId} does not exist`);
  } else {
    return review;
  }
};

const getReviewByCourseAndReviewer = async (courseId, reviewerId) => {
  const review = await Reviews.findOne({
    where: {
      courseId,
      reviewer: reviewerId
    }
  });
  if (review === null) {
    console.log(`Review for course ${courseId} and reviewer ${reviewerId} does not exist`);
  } else {
    return review;
  }
};

const _updateCourseWithReview = async (review, isAdd) => {
  const course = await _getCourse(review.courseId);
  if (course) {
    let updatedCourse = course;
    updatedCourse[_num2Word(review.rating)] = isAdd ? course[_num2Word(review.rating)] + 1 : course[_num2Word(review.rating)] - 1;
    updatedCourse.totalRatings = isAdd ? course.totalRatings + 1 : course.totalRatings - 1;
    updatedCourse.totalStars = isAdd ? course.totalStars + review.rating : course.totalStars - review.rating;
    updatedCourse.overallRatings = updatedCourse.totalStars / updatedCourse.totalRatings;
    const savedCourse = await Ratings.update(updatedCourse, {
      where: {
        courseId: review.courseId
      }
    });
    return updatedCourse;
  }
};

const _updateReviewer = async (reviewerId, isAdd) => {
  const reviewer = await getReviewerById(reviewerId);
  if (reviewer) {
    let updatedReviewer = reviewer;
    updatedReviewer.reviews = isAdd ? reviewer.reviews + 1 : reviewer.reviews - 1;
    updatedReviewer.coursesTaken = isAdd ? reviewer.coursesTaken + 1: reviewer.coursesTaken - 1;
    const savedReviewer = await Reviewers.update(updatedReviewer, {
      where: {
        reviewerId
      }
    })
    return updatedReviewer;
  }
};

const addReview = async (review) => {
  const updatedReviewer = await _updateReviewer(review.reviewer, true);
  if (!updatedReviewer) {
    console.log(`reviewer ${review.reviewer} does not exist - submit new reviewer first`);
    return;
  }

  const updatedCourse = await _updateCourseWithReview(review, true);
  if (!updatedCourse) {
    console.log(`course ${review.courseId} does not exist - submit new course first`);
    return;
  }

  const reviewId = crypto.createHash('md5').update(`course${review.courseId}_review${updatedCourse.reviews}`).digest('hex');
  review.id = reviewId;
  const savedReview = await Reviews.create(review);
  return savedReview;
};

const addReviewer = async (reviewer) => {
  reviewer.reviews = 0;
  reviewer.coursesTaken = 0;
  const savedReviewer = Reviewers.create(reviewer);
  return savedReviewer;
};

const addCourse = async (courseId) => {
  let course = {
    one: 0,
    onehalf: 0,
    two: 0,
    twohalf: 0,
    three: 0,
    threehalf: 0,
    four: 0,
    fourhalf: 0,
    five: 0,
    totalStars: 0,
    totalRatings: 0,
    overallRatings: 0,
    courseId
  };
  const savedCourse = Ratings.create(course);
  return savedCourse;
};

const deleteReview = async (review) => {
  const updatedReviewer = await _updateReviewer(review.reviewer, false);
  const updatedCourse = await _updateCourseWithReview(review, false);

  const savedReview = await Reviews.destroy({
    where: {
      id: review.id
    }
  });
};

const updateReview = async (review) => {
  const updatedReview = await Reviews.update(review, {
    where: {
      id: review.id
    }
  });
  return updatedReview[0];
};

module.exports = {
  getAllCourseContent,
  getReviewerById,
  getReviewById,
  getReviewByCourseAndReviewer,
  addReview,
  addReviewer,
  addCourse,
  deleteReview,
  updateReview
};

