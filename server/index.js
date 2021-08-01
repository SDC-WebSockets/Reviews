require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const shrinkRay = require('shrink-ray-current');
const couchbase = require('./cbInterface.js');
const pg = require('./pgInterface.js');
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
app.get('/reviews/item/:courseId', (req, res) => {
  let courseId = Number(req.params.courseId);
  console.log(`fetching course reviews for course ${courseId}`);

  if (Number.isInteger(courseId)) {
    pg.getAllCourseContent(courseId)
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        console.log('error')
        res.status(400).send(`course ${courseId} does not exist`);
      });
  } else {
    res.json('No course selected');
  }
});

// DB CRUD
// Reviewer Operations
app.get('/reviews/reviewer/:reviewerId', (req, res) => {
  const reviewerId = req.params.reviewerId;
  console.log(`fetching reviewer ${reviewerId}`);
  pg.getReviewerById(reviewerId)
    .then(reviewer => {
      res.status(200).send(reviewer);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(`Failed to fetch reviewer with id ${reviewerId}`);
    });
});
app.post('/reviews/reviewer/:reviewerId', (req, res) => {
  const reviewerId = req.params.reviewerId;
  console.log(`adding reviewer ${reviewerId}`);
  const reviewer = req.body;
  pg.addReviewer(reviewer)
    .then(reviewer => {
      res.status(201).send(reviewer.dataValues);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(`Failed to create reviewer with id ${reviewerId}`);
    });
});

// Review Operations
app.get('/reviews/item/:courseId/review/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  const courseId = req.params.courseId;
  console.log(`fetching review ${reviewId}`);
  pg.getReviewById(reviewId)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(`Failed to fetch review for document ${reviewerId}`);
    });
});
app.post('/reviews/item/:courseId/review/:reviewId', (req, res) => {
  // check that all properties are present
  let review = req.body;
  console.log(`posting review for course ${req.params.courseId}`);
  if (review.courseId && review.reviewer && review.rating && review.comment && review.helpful) {
    review.createdAt = review.createdAt || new Date();
    pg.addReview(review)
      .then(review => {
        if (review) {
          res.status(201).send(review.dataValues);
        } else {
          throw 'review not created';
        }
      })
      .catch(err => {
        console.error(err);
        res.status(400).send(`Failed to create review for course ${req.params.courseId}`);
      });
  } else {
    res.status(400).send('Payload missing required fields');
  }
});
app.put('/reviews/item/:courseId/review/:reviewId', (req, res) => {
  let review = req.body;
  const reviewId = req.params.reviewId;
  review.id = reviewId;
  console.log(`updating review ${reviewId}`);
  pg.updateReview(review)
    .then((updCount) => {
      res.status(200).send({updated: updCount});
    })
    .catch((err) => {
      res.status(400).send(`failed to update ${reviewId}`);
    });
});
app.delete('/reviews/item/:courseId/review/:reviewId', (req, res) => {
  const courseId = req.params.courseId;
  const reviewId = req.params.reviewId;
  let review = req.body;
  review.id = reviewId;
  console.log(`deleting review ${reviewId}`);
  pg.deleteReview(review)
    .then((result) => {
      res.status(200).send(`review for course ${courseId} successfully deleted`);
    })
    .catch((err) => {
      res.status(400).send(`failed to delete review for course ${courseId}`);
    });
});

// Course Operations
app.post('/reviews/item/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  console.log(`adding course ${courseId}`);
  pg.addCourse(courseId)
    .then(result => {
      res.status(201).send(result.dataValues);
    })
    .catch(err => res.status(400).send(`failed to add course ${courseId}`));
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});