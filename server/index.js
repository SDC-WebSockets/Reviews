const express = require('express');
const path = require('path');
const cors = require('cors');
const shrinkRay = require('shrink-ray-current');
const couchbase = require('./cbInterface.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 2712;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(shrinkRay());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// get reviews and ratings for one course
app.get('/reviews/item', (req, res) => {
  let courseId = Number(req.query.courseId);
  console.log(`fetching course reviews for ${courseId}`);
  if (Number.isInteger(courseId)) {
    couchbase.getCourseReviewsAndRatings(courseId)
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(400).send(`course ${courseId} does not exist`);
      });
  } else {
    res.json('No course selected');
  }
});

// DB CRUD
app.get('/reviews/reviewer/:reviewerId', (req, res) => {
  const reviewerId = req.params.reviewerId;

  couchbase.getReviewerById(reviewerId)
    .then(reviewer => {
      res.status(200).send(reviewer);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(`Failed to fetch reviewer with id ${reviewerId}`);
    });
});

app.get('/review/item', (req, res) => {
  const reviewerId = req.query.reviewerId;
  const courseId = req.query.courseId;

  couchbase.getReviewByReviewerIdAndCourseId(courseId, reviewerId)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(`Failed to fetch review for document ${reviewerId}`);
    });
});

app.post('/reviews/item', (req, res) => {
  // check that all properties are present
  let review = req.body;
  if (review.courseId && review.reviewer && review.rating && review.comment && review.helpful) {
    review.createdAt = review.createdAt || new Date();
    couchbase.addReviewForCourse(review)
      .then(review => res.status(201).send(review))
      .catch(err => {
        console.error(err);
        res.status(400).send(`Failed to create review for course ${review.courseId}`);
      });
  } else {
    res.status(400).send('Payload missing required fields');
  }
});

app.put('/reviews/reviewer/:id', (req, res) => {
  let reviewer = req.body;
  const reviewerId = reviewer.reviewer;

  couchbase.updateReviewer(reviewer)
    .then((result) => {
      res.status(200).send(`reviewer id ${reviewerId} successfully updated`);
    })
    .catch((err) => {
      res.status(400).send(`failed to update ${reviewerId}`);
    });
});

app.delete('/reviews/item/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const review = req.body;
  couchbase.deleteReview(courseId, review)
    .then((result) => {
      res.status(200).send(`review for course ${courseId} successfully deleted`);
    })
    .catch((err) => {
      res.status(400).send(`failed to delete review for course ${courseId}`);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});