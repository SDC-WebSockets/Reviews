const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDb = require('../database/mongoDb.js');
const dataGenerators = require('../database/dataGenerators.js');
const app = express();
const port = 2712;

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reviews', (req, res) => {
  let reviews;
  let ratings;
  mongoDb.getAllReviews()
    .then((allReviews) => {
      reviews = allReviews;
      mongoDb.getAllRatings()
        .then((allRatings) => {
          ratings = allRatings;
          // console.log(reviews.length);
          // console.log(ratings.length);
          res.status(200).send(JSON.stringify({allReviews: reviews, allRatings: ratings}));
        });
    });
});

app.get('/reviews/item', (req, res) => {
  let courseId = req.query.id;
  let reviews;
  let rating;
  mongoDb.getReviewsForOneCourse(courseId)
    .then((results) => {
      reviews = results;
      mongoDb.getRatingForOneCourse(courseId)
        .then((result) => {
          rating = result;
          // console.log(reviews.length);
          // console.log(rating);
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