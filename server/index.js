const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoDb = require('../database/mongoDb.js');
const app = express();
const PORT = process.env.PORT || 2712;

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
// app.use('/*', express.static(path.join(__dirname, '..', 'client', 'public')));

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

app.get('/reviews/item', (req, res) => {
  let courseId;
  let reviews;
  let rating;
  isNaN(req.query.courseId) ? courseId = 1 : courseId = req.query.courseId;
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
});

// app.get('/reviewBundle.js', (req, res) => {
//   let bundlePath = path.join(__dirname, '..', 'client', 'public', 'reviewBundle.js');
//   console.log(bundlePath);
//   res.sendFile(path.join(__dirname, '..', 'client', 'public', 'reviewBundle.js'));
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});