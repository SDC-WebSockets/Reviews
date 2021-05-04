const express = require('express');
const path = require('path');

const cors = require('cors');
const mongoDb = require('../database/mongoDb.js');
const app = express();
const port = 2712;


app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(cors());

app.get('/reviews', (req, res) => {
  let reviews;
  let ratings;
  mongoDb.getAllReviews()
    .then((allReviews) => {
      reviews = allReviews;
      mongoDb.getAllRatings()
        .then((allRatings) => {
          ratings = allRatings;
          res.status(200).send(JSON.stringify({allReviews: reviews, allRatings: ratings}));
        });
    });
});

app.get('/reviews/item', (req, res) => {
  console.log(req.originalUrl);
  let courseId = req.query.id;
  let reviews;
  let rating;
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
          res.status(200).send(JSON.stringify(data));
        });
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});