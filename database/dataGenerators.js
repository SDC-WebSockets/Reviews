const addReviewAndUpdateRatingInDb = require('./mongoDb.js').addReviewAndUpdateRating;
const resetRatingInDb = require('./mongoDb.js').resetRating;
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

let usedReviewerIds = [];

// create a random review for a given course
const generateRandomReview = (courseId) => {
  let randomDate = (date1, date2) => {
    return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
  };

  let randomReviewerId = randomInclusiveInteger(100000, 999999, usedReviewerIds);
  usedReviewerIds.push(randomReviewerId);

  let randomName = faker.name.findName();
  let initials = randomName.split(' ').map((n)=>n[0]).join('').slice(0, 2);

  let randomAvatar = faker.image.avatar();
  let avatars = [initials, initials, initials, randomAvatar];
  let avatarOrNoAvatar = avatars[randomInclusiveInteger(0, 3)];

  let randomNoOfCourses = randomInclusiveInteger(1, 50);
  let randomNoOfReviews = randomInclusiveInteger(1, randomNoOfCourses);

  let randomReviewer = {
    reviewerId: randomReviewerId,
    name: randomName,
    picture: avatarOrNoAvatar,
    coursesTaken: randomNoOfCourses,
    reviews: randomNoOfReviews
  };

  const ratings = [5, 5, 5, 5, 5, 4, 4, 3, 2, 1]; // makes it more likely for it to have good ratings
  let randomRating = ratings[randomInclusiveInteger(0, 9)];

  let randomComment = faker.lorem.sentences();

  let startTime = new Date('01 January 2018 00:00 UTC');
  let currentTime = new Date('27 April 2021 10:30 UTC');
  let randomTime = randomDate(startTime, currentTime).toISOString();

  let randomHelpful = randomInclusiveInteger(1, 50);

  let randomReview = {
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



// ------ ADD RANDOM REVIEWS TO DATABASE ------
const addReviewsInCourseOrder = () => {
  let numberOfCourses = 100;
  let outerInterval = 2000;
  let innerInterval = 100;

  for (let i = 1; i <= numberOfCourses; i++) {
    setTimeout(() => {
      if (i % 13 !== 0) {
        let randomTimes = randomInclusiveInteger(1, 10);
        for (let j = 0; j < randomTimes; j++) {
          setTimeout(() => {
            let randomReview = generateRandomReview(i);
            addReviewAndUpdateRatingInDb(randomReview);
            console.log(randomReview);
          }, j * innerInterval);
        }
      }
    }, i * outerInterval);
  }

};
// // addReviewsInCourseOrder();



// ------ RESET 100 RATINGS ------
const resetRatingsInDb = () => {
  let exampleRating = {
    courseId: 1
  };
  let numberOfTimes = 100;
  let interval = 200;
  for (let i = 0; i < numberOfTimes; i++) {
    setTimeout(() => {
      resetRatingInDb(exampleRating);
      exampleRating.courseId++;
    }, interval * i);
  }
};
// // resetRatingsInDb();