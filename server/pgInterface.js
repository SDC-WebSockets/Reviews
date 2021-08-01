const { sequelize, Reviews, Reviewers, Ratings } = require('../database/postgres.js');
const { Op } = require('sequelize');

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

const _getCourse = async (courseId) => {
  const course = await Ratings.findByPk(courseId);
  if (course === null) {
    console.log(`course ${courseId} does not exist`);
  } else {
    return course;
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
    return reviews;
  }
};

const _getReviewers = async (reviews) => {
  const courseId = reviews[0].courseId;
  const reviewerOrs = reviews.map(review => { reviewerId });
  const reviewers = await Reviews.findAll({
    where: {
      [Op.or]: reviewerOrs
    }
  });
  if (reviewers === null) {
    console.log(`reviewers for course ${courseId} do not exist`);
  } else {
    return reviewers;
  }
};

const getAllCourseContent = async (courseId) => {
  const course = await _getCourse(courseId);
  const newRating = _mapKeys(course);
  const reviews = await _getReviews(courseId);
  const reviewers = await _getReviewers(reviews);

  const reviewersObj = reviewers.reduce((memo, reviewer) => memo[reviewer.reviewerId] = reviewer, {});

  const reviewsAndReviewers = reviews.map(review => {
    review.reviewer = reviewersObj[review.reviewer];
    return review;
  });

  return {
    courseId,
    ratings: newRating,
    reviews: reviewsAndReviewers
  };
};

const getReviewerById = async (reviewerId) => {
  const reviewer = await Reviewers.findByPk(reviewerId);
  if (reviewer === null) {
    console.log(`Reviewer ${reviewerId} does not exist`);
  } else {
    return reviewer;
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
        courseId
      }
    });
    return savedCourse;
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
    return savedReviewer;
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

const deleteReview = (review) => {
  const updatedReviewer = await _updateReviewer(review.reviewer, false);
  const updatedCourse = await _updateCourseWithReview(review, false);

  const savedReview = await Reviews.destroy({
    where: {
      reviewId: review.reviewId
    }
  });
};

module.exports = {
  getAllCourseContent,
  getReviewerById,
  getReviewById,
  getReviewByCourseAndReviewer,
  addReview,
  addReviewer,
  addCourse,
  deleteReview
};

