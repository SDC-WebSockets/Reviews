const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review-service', { useNewUrlParser: true,  useUnifiedTopology: true });

const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'connection error:'));
mongoDb.once('open', () => {
  console.log('Connected to the MongoDB database');
});

const reviewSchema = new mongoose.Schema({ // 1 -> many: course_id -> reviews
  course_id: Number,  // "foreign key"
  reviewer: Object,   // {“reviewerId”: Number,
                      // “name”: String,
                      // “pictureUrl”: String,
                      // “coursesTaken”: Number, // only for featured review
                      // “reviews”: Number} // only for featured review
  rating: Number,
  comment: String,
  createdAt: Date,
  helpful: Number,
  reported: Boolean
});

const ratingSchema = new mongoose.Schema({ // 1 <-> 1: course_id <-> rating
  course_id: Number,
  overallRating: Number,
  total: Number,
  fiveStars: Number,
  fourStars: Number,
  threeStars: Number,
  twoStars: Number,
  oneStar: Number
});

let Review = mongoose.model('Review', reviewSchema);
let Rating = mongoose.model('Rating', ratingSchema);

const addReview = (review) => {
  Review.updateOne({ }, {
        course_id: review.course_id,  // "foreign key"
        reviewer: {
          name: review.reviewer.name,
          picture: review.reviewer.picture,
          coursesTaken: review.reviewer.coursesTaken,
          reviews: review.reviewer.reviews
        },
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        helpful: 0,
        reported: false
      }
    , {upsert:true}, (err) => {
      if (err) {
        console.log('Error saving review to database:', err);
      } else {
        console.log(`Review for course id ${review.course_id} saved/updated in database`);
        let filter = {course_id: review.course_id};
        let options = {new: true, useFindAndModify: false};
        let callback = (err) => {
          err ? console.log('Error updating rating in database:', err) : console.log(`Updated rating for course id ${review.course_id}`);
        };
        if (review.rating === 5) {
          Rating.findOneAndUpdate(filter, { $inc: {fiveStars: 1}}, options, callback);
        } else if (review.rating === 4) {
          Rating.findOneAndUpdate(filter, { $inc: {fourStars: 1}}, options, callback);
        } else if (review.rating === 3) {
          Rating.findOneAndUpdate(filter, { $inc: {threeStars: 1}}, options, callback);
        } else if (review.rating === 2) {
          Rating.findOneAndUpdate(filter, { $inc: {twoStars: 1}}, options, callback);
        } else if (review.rating === 1) {
          Rating.findOneAndUpdate(filter, { $inc: {oneStar: 1}}, options, callback);
        }
      }
    })
}

let exampleReview = {
  course_id: 1,  // "foreign key"
  reviewer: {
    name: 'Fred Rosselet',
    picture: 'someUrl',
    coursesTaken: 12,
    reviews: 10
  },
  rating: 5,
  comment: 'awesome course. Highly recommend.',
  createdAt: Date.now(),
  helpful: 0,
  reported: false
}

// addReview(exampleReview);


// ---------    DO NOT UNCOMMENT (used for populating ratings collection empty listings)

// const saveRating = (rating) => {
//   Rating.updateOne({course_id: rating.course_id},
//     {
//       course_id: rating.course_id,
//       overallRating: 0,
//       total: 0,
//       fiveStars: 0,
//       fourStars: 0,
//       threeStars: 0,
//       twoStars: 0,
//       oneStar: 0
//     }
//   ,{upsert: true}, (err) => {
//     if (err) {
//       console.log('Error saving rating to database:', err);
//     } else {
//       console.log(`Rating for course id ${rating.course_id} saved/updated in database`);
//     }
//   })
// };


// // RESET ONE RATING
// let exampleRating = {
//   course_id: 1
// }

// saveRating(exampleRating);


// // RESET 100 RATINGS
// const resetRatings = () => {
//   let exampleRating = {
//     course_id: 1
//   }
//   let numberOfTimes = 100;
//   let delay = 500;
//   for (let i = 0; i < numberOfTimes; i++) {
//     setTimeout(() => {
//     saveRating(exampleRating);
//       exampleRating.course_id++;
//     }, delay * i);
//   }
// }

// resetRatings();

