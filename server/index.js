const express = require('express');
const path = require('path');
const cors = require('cors');
const shrinkRay = require('shrink-ray-current');
const mongoDb = require('../database/mongoDb.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 2712;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(shrinkRay());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// get reviews and ratings for all courses
app.get('/reviews', (req, res) => {
  let reviews;
  let ratings;
  mongoDb.getAllReviews()
    .then((allReviews) => {
      reviews = allReviews;
      mongoDb.getAllRatings()
        .then((allRatings) => {
          ratings = allRatings;
          res.status(200).json({allReviews: reviews, allRatings: ratings});
        });
    });
});

// get reviews and ratings for one course
app.get('/reviews/item', (req, res) => {
  let courseId = Number(req.query.courseId);
  let reviews;
  let rating;
  if (Number.isInteger(courseId) && courseId >= 1 && courseId <= 100) {
    mongoDb.getReviewsForOneCourse(courseId)
      .then((results) => {
        reviews = results;
        mongoDb.getRatingForOneCourse(courseId)
          .then((result) => {
            rating = result;
            let data = {
              courseId: courseId,
              ratings: rating,
              reviews: reviews
            };
            res.status(200).json(data);
          });
      });
  } else {
    res.json('No course selected');
  }
});

// DB CRUD
app.get('/reviews/item/:id', (req, res) => {
  const reviewId = req.params.id;
  mongoDb.getReviewById(reviewid)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      res.status(400).send(`Failed to get review ${reviewId}`);
    });
});

app.post('/reviews/item', (req, res) => {
  // check that all properties are present
  let review = req.body;
  if (review.courseId && review.reviewer && review.rating && review.comment && review.helpful) {
    if (Number.isInteger(review.courseId) && review.courseId >= 1 && review.courseId <= 100) {
      review.createdAt = review.createdAt || new Date();
      mongoDb.addReviewAndUpdateRating(review)
        .then(() => res.status(201).send(`Review created for course ${review.courseId}`))
        .catch((err) => {
          console.error(err);
          res.status(400).send(`Failed to create review for course ${review.courseId}`);
        });
    }
  } else {
    res.status(400).send('Payload missing required fields');
  }
});

app.put('/reviews/item/:id', (req, res) => {
  let review = req.body;
  const reviewId = review.id;
  mongoDb.updateReviewAndRating(req.body)
    .then((result) => {
      res.status(200).send(`review id ${reviewId} successfully updated`);
    })
    .catch((err) => {
      res.status(400).send(`failed to update ${reviewId}`);
    });
});

app.delete('reviews/item/:id', (req, res) => {
  let review = req.body;
  const reviewId = review.id;
  mongoDb.deleteReviewAndUpdateRating(req.body)
    .then((result) => {
      res.status(200).send(`review id ${reviewId} successfully deleted`);
    })
    .catch((err) => {
      res.status(400).send(`failed to update ${reviewId}`);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});