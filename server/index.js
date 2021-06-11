const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoDb = require('../database/mongoDb.js');
const app = express();
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 2712;
const host = process.env.HOST || 'localhost';

app.use(compression({level: 9}));
app.use(cors());
app.use('/', expressStaticGzip(path.join(__dirname, '..', 'client', 'public')));
// app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

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

app.get('/bundle', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'reviewBundle.js'));
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});