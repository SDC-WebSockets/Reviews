const Review = require('./mongoDb.js').Review;
const Rating = require('./mongoDb.js').Rating;
const faker = require('faker');

// ====== ADD REVIEWS TO DATABASE ======
const addReview = (review) => {
  return new Promise ((resolve, reject) => {

    let document = new Review({
      courseId: review.courseId,
      reviewer: {
        reviewerId: review.reviewer.reviewerId,
        name: review.reviewer.name,
        picture: review.reviewer.picture,
        coursesTaken: review.reviewer.coursesTaken,
        reviews: review.reviewer.reviews
      },
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      helpful: review.helpful,
      reported: false
    });

    document.save((err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Review for course id ${review.courseId} saved/updated in database`);
        resolve(result); // = review
      }
    });
  });
};

const findRating = (review) => {
  return new Promise ((resolve, reject) => {
    Rating.findOne({courseId: review.courseId}, (err, rating) => {
      if (err) {
        reject(err);
      } else {
        console.log('Corresponding rating found:', rating);
        resolve(rating);
      }
    });
  });
};

const updateRating = (review, rating) => {
  return new Promise ((resolve, reject) => {
    let filter = {courseId: review.courseId};
    let currentRating = review.rating;
    let newTotalStars = rating.totalStars + currentRating;
    let newTotalRatings = rating.totalRatings + 1;
    let updatedTier = rating.fiveStars + 1;
    let newOverallRating = newTotalStars / newTotalRatings;
    let valuesToSet = { overallRating: newOverallRating, totalRatings: newTotalRatings, totalStars: newTotalStars };
    let callback = (err, results) => {
      if (err) {
        console.log('Error updating corresponding rating:', err);
        reject(err);
      } else {
        console.log('Results from updateRating:', results);
        resolve(results);
      }
    };
    if (review.rating === 5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { fiveStars: 1}}, callback);
    } else if (review.rating === 4) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { fourStars: 1}}, callback);
    } else if (review.rating === 3) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { threeStars: 1}}, callback);
    } else if (review.rating === 2) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { twoStars: 1}}, callback);
    } else if (review.rating === 1) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { oneStar: 1}}, callback);
    }
  });
};

const addReviewAndUpdateRating = (review) => {
  addReview(review)
    .then((result) => {
      // console.log('Result from addReview:', result);
      findRating(result)
        .then((rating) => {
          console.log('Result from findRating:', rating);
          updateRating(review, rating);
        })
        .catch((err) => {
          console.log('Error in addReviewAndUpdateRating:', err);
        });
    });
};







// ------ GENERATE RANDOM REVIEWS ------

const generateRandomReview = () => {
  // helper functions
  let randomInclusiveInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  let randomDate = (date1, date2) => {
    return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
  };

  // let randomReviews = [];

  // for (let i = 0; i < 1000; i++) {
  let randomCourseId = randomInclusiveInteger(1, 100);
  let randomReviewer = {
    reviewerId: randomInclusiveInteger(100000, 999999),
    name: faker.name.findName(),
    picture: faker.image.avatar(),
    coursesTaken: randomInclusiveInteger(1, 50),
    reviews: randomInclusiveInteger(1, 50)
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


// ------ ADD RANDOM REVIEWS TO DATABASE ------
// setInterval(() => {
//   let randomReview = generateRandomReview();
//   addReviewAndUpdateRating(randomReview);
// }, 100);










// ====== RESET RATINGS COLLECTION ======

const resetRating = (rating) => {
  Rating.updateOne({courseId: rating.courseId},
    {
      courseId: rating.courseId,
      overallRating: 0,
      totalRatings: 0,
      totalStars: 0,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStar: 0
    }, {upsert: true}, (err) => {
      err ? console.log('Error saving rating to database:', err) : console.log(`Rating for course id ${rating.courseId} saved/updated in database`);
    });
};

// ------ RESET ONE RATING ------
// let exampleRating = {
//   course_id: 1
// }

// resetRating(exampleRating);



// ------ RESET 100 RATINGS ------
// const resetRatings = () => {
//   let exampleRating = {
//     courseId: 1
//   };
//   let numberOfTimes = 100;
//   let delay = 200;
//   for (let i = 0; i < numberOfTimes; i++) {
//     setTimeout(() => {
//       resetRating(exampleRating);
//       exampleRating.courseId++;
//     }, delay * i);
//   }
// };

// resetRatings();