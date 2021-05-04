const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review-service', { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'connection error:'));
mongoDb.once('open', () => {
  console.log('Connected to the MongoDB database');
});

const reviewSchema = new mongoose.Schema({ // 1 -> many: course_id -> reviews
  courseId: Number,
  reviewer: Object, // {“reviewerId”: Number, “name”: String, “picture”: String, “coursesTaken”: Number, “reviews”: Number}
  rating: Number,
  comment: String,
  createdAt: Date,
  helpful: Number,
  reported: Boolean
});

const ratingSchema = new mongoose.Schema({ // 1 <-> 1: course_id <-> rating
  courseId: Number,
  overallRating: Number, // average rating
  totalRatings: Number, // amount of ratings
  totalStars: Number,
  '5': Number,
  '4 1/2': Number,
  '4': Number,
  '3 1/2': Number,
  '3': Number,
  '2 1/2': Number,
  '2': Number,
  '1 1/2': Number,
  '1': Number
});

let Review = mongoose.model('Review', reviewSchema);
let Rating = mongoose.model('Rating', ratingSchema);

const getAllReviews = () => {
  return new Promise ((resolve, reject) => {
    Review.find((err, reviews) => {
      err ? reject(err) : resolve(reviews);
    });
  });
};

const getReviewsForOneCourse = (id) => {
  return new Promise ((resolve, reject) => {
    Review.find({courseId: id}, (err, reviews) => {
      err ? reject(err) : resolve(reviews);
    });
  });
};

const getAllRatings = () => {
  return new Promise ((resolve, reject) => {
    Rating.find((err, ratings) => {
      err ? reject(err) : resolve(ratings);
    });
  });
};

const getRatingForOneCourse = (id) => {
  return new Promise ((resolve, reject) => {
    Rating.findOne({courseId: id}, (err, rating) => {
      err ? reject(err) : resolve(rating);
    });
  });
};

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
      err ? reject(err) : resolve(result); // = review as it is stored in DB
    });
  });
};

const updateRating = (review, rating) => {
  return new Promise ((resolve, reject) => {
    let filter = {courseId: review.courseId};
    let newTotalStars = rating.totalStars + review.rating;
    let newTotalRatings = rating.totalRatings + 1;
    let currentRating = review.rating.toString();
    let newOverallRating = newTotalStars / newTotalRatings;

    let valuesToSet = { overallRating: newOverallRating, totalRatings: newTotalRatings, totalStars: newTotalStars };
    let callback = (err, results) => { err ? reject(err) : resolve(results); };

    if (review.rating === 5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: { '5': 1} }, callback);
    } else if (review.rating === 4.5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'4 1/2': 1} }, callback);
    } else if (review.rating === 4) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'4': 1} }, callback);
    } else if (review.rating === 3.5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'3 1/2': 1} }, callback);
    } else if (review.rating === 3) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'3': 1} }, callback);
    } else if (review.rating === 2.5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'2 1/2': 1} }, callback);
    } else if (review.rating === 2) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'2': 1} }, callback);
    } else if (review.rating === 1.5) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'1 1/2': 1} }, callback);
    } else if (review.rating === 1) {
      Rating.updateOne(filter, { $set: valuesToSet, $inc: {'1': 1} }, callback);
    }
  });
};

const addReviewAndUpdateRating = (review) => {
  return new Promise ((resolve, reject) => {
    addReview(review)
      .catch((err) => {
        console.log(err);
      })
      .then((result) => {
        getRatingForOneCourse(result.courseId)
          .catch((err) => {
            console.log(err);
          })
          .then((rating) => {
            updateRating(review, rating)
              .catch((err) => {
                reject(err);
              })
              .then((result) => {
                resolve(result);
              });
          });
      });
  });
};


const resetRating = (rating) => {
  return new Promise ((resolve, reject) => {
    Rating.updateOne({courseId: rating.courseId},
      {
        courseId: rating.courseId,
        overallRating: 0,
        totalRatings: 0,
        totalStars: 0,
        '5': 0,
        '4 1/2': 0,
        '4': 0,
        '3 1/2': 0,
        '3': 0,
        '2 1/2': 0,
        '2': 0,
        '1 1/2': 0,
        '1': 0,
      }, {upsert: true}, (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

module.exports = {
  Review, // used in dataGenerators.js
  Rating, // used in dataGenerators.js
  getAllReviews, // used in server and s3.js
  getReviewsForOneCourse, // used in server
  getAllRatings, // used in server and s3.js
  getRatingForOneCourse, // used in server
  addReviewAndUpdateRating, // used in dataGenerators.js
  resetRating // used in dataGenerators.js
};