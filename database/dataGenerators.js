const Rating = require('./mongoDb.js').Rating;
const Review = require('./mongoDb.js').Review;
const Reviewer = require('./mongoDb.js').Reviewer;
const addReviewAndUpdateRating = require('./mongoDb.js').addReviewAndUpdateRating;
const resetRating = require('./mongoDb.js').resetRating;
const faker = require('faker');
const crypto = require('crypto');

// helper functions
const randomInclusiveInteger = (min, max, exceptions = []) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  while (exceptions.includes(randomInteger)) {
    randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomInteger;
};

const randomDate = (date1, date2) => {
  return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
};

const colors = [
  'rgb(77, 171, 101)',
  'rgb(156, 70, 127)',
  'rgb(240, 189, 79)',
  'rgb(115, 114, 108)',
  'rgb(40, 150, 169)'
];

const randomColor = () => {
  return colors[randomInclusiveInteger(0, colors.length - 1)];
};

let usedReviewerIds = [];
const generateRandomReviewer = (courseId) => {
  const randomReviewerId = crypto.createHash('md5').update(randomInclusiveInteger(0, 499999).toString()).digest('hex');
  usedReviewerIds.push(randomReviewerId);
  const randomName = faker.name.findName();
  const randomAvatar = `https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar${randomInclusiveInteger(0, 999)}.jpg`;
  const avatars = [randomColor(), randomColor(), randomColor(), randomAvatar];
  const avatarOrNoAvatar = avatars[randomInclusiveInteger(0, 3)];

  const reviewCounts = usedReviewerIds.reduce((memo, val) => {
    memo = val === randomReviewerId ? memo + 1 : memo;
    return memo;
  }, 0);

  const randomNoOfCourses = reviewCounts;
  const randomNoOfReviews = randomInclusiveInteger(1, randomNoOfCourses);
  const randomReviewer = {
    reviewerId: randomReviewerId,
    name: randomName,
    picture: avatarOrNoAvatar,
    coursesTaken: randomNoOfCourses,
    reviews: randomNoOfReviews
  };
  return randomReviewer;
};



// create a random review for a given course ID
const generateRandomReview = (courseId, reviewNum) => {
  // const randomReviewerId = randomInclusiveInteger(100000, 999999, usedReviewerIds);
  // CREATE REVIEWER


  // make it likely for it to have good ratings
  const ratings = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1];
  const randomRating = ratings[randomInclusiveInteger(0, ratings.length - 1)];
  const randomComment = faker.lorem.text();
  // random date since 1/1/2018
  const startTime = new Date('01 January 2018 00:00 UTC');
  const currentTime = new Date();
  const randomTime = randomDate(startTime, currentTime).toISOString();
  const randomHelpful = randomInclusiveInteger(1, 50);

  const randomReview = {
    courseId: courseId,
    reviewer: randomReviewer,
    rating: randomRating,
    comment: randomComment,
    createdAt: randomTime,
    helpful: randomHelpful,
    reported: false
  };

  return randomReview;
};

// ------ SET ALL RATINGS TO 0 ------
const resetRatings = async (noOfCourses) => {
  for (let i = 1; i <= noOfCourses; i++) {
    await resetRating(i);
  }
};

// ------ ADD RANDOM REVIEWS TO DATABASE ------
const addRandomReviews = async (noOfCourses) => {
  for (let i = 1; i <= noOfCourses; i++) {
    if (i % 13 !== 0) {
      let randomNumberOfReviews = randomInclusiveInteger(1, 100); // creates a random number of reviews for current course
      for (let j = 0; j < randomNumberOfReviews; j++) {
        let randomReview = generateRandomReview(i);
        await addReviewAndUpdateRating(randomReview);
        console.log('Review added to database:', randomReview);
      }
    }
  }
};

// ------ RESET AND REPOPULATE DATABASE ------
const populateDatabase = async (noOfCourses) => {
  await Rating.countDocuments().then((results) => {
    if (results > 0) {
      Rating.collection.drop();
    }
  });
  await Review.countDocuments().then((results) => {
    if (results > 0) {
      Review.collection.drop();
    }
  });
  await Reviewer.countDocuments().then((results) => {
    if (results > 0) {
      Reviewer.collection.drop();
    }
  });
  await resetRatings(noOfCourses);
  await addRandomReviews(noOfCourses);
  console.log('Finished populating database');
};

// === ACTIVATE HERE === (node database/dataGenerators.js)
// populateDatabase(100);
generateRandomReviewer(1);

generateRandomReviewer(2);
generateRandomReviewer(2);
generateRandomReviewer(2);
generateRandomReviewer(2);



