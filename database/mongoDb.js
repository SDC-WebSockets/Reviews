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
  totalStars: Number, // total of stars
  fiveStars: Number,
  fourStars: Number,
  threeStars: Number,
  twoStars: Number,
  oneStar: Number
});

let Review = mongoose.model('Review', reviewSchema);
let Rating = mongoose.model('Rating', ratingSchema);

const getAllReviews = () => {
  return new Promise ((resolve, reject) => {
    Review.find((err, reviews) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Found ${reviews.length} reviews.`);
        resolve(reviews);
      }
    });
  });
};

const getReviewsForOneCourse = (id) => {
  return new Promise ((resolve, reject) => {
    Review.find({courseId: id}, (err, reviews) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Found ${reviews.length} reviews for courseId ${id}.`);
        resolve(reviews);
      }
    });
  });
};

const getAllRatings = () => {
  return new Promise ((resolve, reject) => {
    Rating.find((err, ratings) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Found ${ratings.length} ratings.`);
        resolve(ratings);
      }
    });
  });
};

const getRatingForOneCourse = (id) => {
  return new Promise ((resolve, reject) => {
    Rating.findOne({courseId: id}, (err, rating) => {
      if (err) {
        reject(err);
      } else {
        console.log('Corresponding rating found:', rating);
        resolve(rating);
      }
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
      if (err) {
        reject(err);
      } else {
        console.log(`Review for course id ${review.courseId} saved/updated in database`);
        resolve(result); // = review as it appears in DB
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
      getRatingForOneCourse(result.courseId)
        .then((rating) => {
          // console.log('Result from findRating:', rating);
          updateRating(review, rating);
        })
        .catch((err) => {
          console.log('Error in addReviewAndUpdateRating:', err);
        });
    });
};

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

module.exports = {
  getAllReviews,
  getReviewsForOneCourse,
  getAllRatings,
  getRatingForOneCourse,
  addReviewAndUpdateRating,
  resetRating
};