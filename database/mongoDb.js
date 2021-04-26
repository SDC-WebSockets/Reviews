const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review-service', { useNewUrlParser: true,  useUnifiedTopology: true });

const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'connection error:'));
mongoDb.once('open', () => {
  console.log('Connected to the MongoDB database');
});

const ratingSchema = new mongoose.Schema({ // 1 -> 1 relationship with course_id
  course_id: Number,
  overallRating: Number,
  total: Number,
  fiveStars: Number,
  fourStars: Number,
  threeStars: Number,
  twoStars: Number,
  oneStar: Number
});

const reviewSchema = new mongoose.Schema({ // 1 -> many relationship with course_id
  course_id: Number,
  reviewId: Number,
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

let Rating = mongoose.model('Rating', ratingSchema);

const saveRating = (rating) => {

  let totalRatings = rating.fiveStars + rating.fourStars + rating.threeStars + rating.twoStars + rating.oneStar;
  let averageRating = (((rating.fiveStars * 5) + (rating.fourStars * 4) + (rating.threeStars * 3) + (rating.twoStars * 2) + rating.oneStar) / totalRatings).toFixed(1);

  Rating.updateOne({course_id: rating.course_id},
    {
      course_id: rating.course_id,
      overallRating: averageRating,
      total: totalRatings,
      fiveStars: rating.fiveStars,
      fourStars: rating.fourStars,
      threeStars: rating.threeStars,
      twoStars: rating.twoStars,
      oneStar: rating.oneStar
    }
  ,{upsert:true}, (err) => {
    if (err) {
      console.log('Error saving rating to database:', err);
    } else {
      console.log(`Rating for course id ${rating.course_id} saved/updated in database`);
    }
  })
};



// let ratingExample = { // total = 6; average = 4.2
//   course_id: 1,
//   fiveStars: 4,
//   fourStars: 1,
//   threeStars: 0,
//   twoStars: 0,
//   oneStar: 1
// }

// saveRating(ratingExample);

