const addReviewAndUpdateRating = require('./mongoDb.js').addReviewAndUpdateRating;
const resetRating = require('./mongoDb.js').resetRating;
const faker = require('faker');


const generateRandomReview = () => {
  // helper functions
  let randomInclusiveInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  let randomInclusiveIntegerWithExceptions = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
    let exceptions = [13, 26, 39, 52, 65, 78, 91]; // those courseIds will not have any reviews
    while (exceptions.includes(randomInteger)) {
      randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return randomInteger;
  };
  let randomDate = (date1, date2) => {
    return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
  };

  // let randomReviews = [];

  // for (let i = 0; i < 1000; i++) {
  let randomCourseId = randomInclusiveIntegerWithExceptions(1, 100);

  let randomReviewerId = randomInclusiveInteger(100000, 999999);
  // in this scenario, it is very unlikely that two reviewers will have the same ID
  let randomName = faker.name.findName();
  let initials = randomName.split(' ').map((n)=>n[0]).join('').slice(0, 2);
  let randomAvatar = faker.image.avatar();
  let avatars = [initials, initials, initials, randomAvatar];
  let avatarVsNoAvatar = avatars[randomInclusiveInteger(0, 3)];
  let randomNoOfCourses = randomInclusiveInteger(1, 50);
  let randomNoOfReviews = randomInclusiveInteger(1, randomNoOfCourses);

  let randomReviewer = {
    reviewerId: randomReviewerId,
    name: randomName,
    picture: avatarVsNoAvatar,
    coursesTaken: randomNoOfCourses,
    reviews: randomNoOfReviews
  };

  const ratings = [5, 5, 5, 5, 5, 4, 4, 3, 2, 1]; // making it more likely for it to have good ratings
  let randomRating = ratings[randomInclusiveInteger(0, 9)];
  let randomComment = faker.lorem.sentences();
  let startTime = new Date('01 January 2018 00:00 UTC');
  let currentTime = new Date('27 April 2021 10:30 UTC');
  let randomTime = randomDate(startTime, currentTime).toISOString();
  let randomHelpful = randomInclusiveInteger(1, 50);

  let randomReview = {
    courseId: randomCourseId,
    reviewer: randomReviewer,
    rating: randomRating,
    comment: randomComment,
    createdAt: randomTime,
    helpful: randomHelpful,
    reported: false
  };
    // randomReviews.push(randomReview);
  // }

  return randomReview;
};




// ------ ADD 1000 RANDOM REVIEWS TO DATABASE ------
const add1000reviews = () => {
  let numberOfTimes = 1000;
  let interval = 100;
  for (let i = 0; i < numberOfTimes; i++) {
    setTimeout(() => {
      let randomReview = generateRandomReview();
      addReviewAndUpdateRating(randomReview);
    }, i * interval);
  }
};
// add1000reviews();



// ------ RESET 100 RATINGS ------
const resetRatings = () => {
  let exampleRating = {
    courseId: 1
  };
  let numberOfTimes = 100;
  let interval = 200;
  for (let i = 0; i < numberOfTimes; i++) {
    setTimeout(() => {
      resetRating(exampleRating);
      exampleRating.courseId++;
    }, interval * i);
  }
};
// resetRatings();