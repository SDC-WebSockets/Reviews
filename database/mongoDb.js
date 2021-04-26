const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review-service', { useNewUrlParser: true,  useUnifiedTopology: true });

const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'connection error:'));
mongoDb.once('open', () => {
  console.log('Connected to the MongoDB database');
});

const ratingSchema = new mongoose.Schema({
  course_id: Number,
  overallRating: Number,
  total: Number,
  fiveStars: Number,
  fourStars: Number,
  threeStars: Number,
  twoStars: Number,
  oneStar: Number
});

const reviewSchema = new mongoose.Schema({
  course_id: Number,
  reviewId: Number,
  reviewer: Object,   // {“reviewerId”: Number,
                      // “name”: String,
                      // “pictureUrl”: String,
                      // “coursesTaken”: Number,
                      // “reviews”: Number}
  rating: Number,
  comment: String,
  createdAt: Date,
  helpful: Number,
  reported: Boolean
});