const Rating = require('./mongoDb.js').Rating;
const Review = require('./mongoDb.js').Review;
const addReviewAndUpdateRating = require('./mongoDb.js').addReviewAndUpdateRating;
const resetRating = require('./mongoDb.js').resetRating;
const faker = require('faker');

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

// create a random review for a given course ID
const generateRandomReview = (courseId) => {
  const randomReviewerId = randomInclusiveInteger(100000, 999999, usedReviewerIds);
  usedReviewerIds.push(randomReviewerId);
  const randomName = faker.name.findName();
  const randomAvatar = faker.image.avatar();
  const avatars = [randomColor(), randomColor(), randomColor(), randomAvatar];
  const avatarOrNoAvatar = avatars[randomInclusiveInteger(0, 3)];
  const randomNoOfCourses = randomInclusiveInteger(1, 50);
  const randomNoOfReviews = randomInclusiveInteger(1, randomNoOfCourses);
  const randomReviewer = {
    reviewerId: randomReviewerId,
    name: randomName,
    picture: avatarOrNoAvatar,
    coursesTaken: randomNoOfCourses,
    reviews: randomNoOfReviews
  };

  const ratings = [5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1]; // makes it more likely for it to have good ratings
  const randomRating = ratings[randomInclusiveInteger(0, ratings.length - 1)];
  const randomComment = faker.lorem.text();
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
    await resetRating({courseId: i});
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
const resetDatabase = async (noOfCourses) => {
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
  await resetRatings(noOfCourses);
  await addRandomReviews(noOfCourses);
  console.log('Finished populating database');
};

// === ACTIVATE HERE === (node database/dataGenerators.js)
resetDatabase(100);



