const Rating = require('./mongoDb.js').Rating;
const Review = require('./mongoDb.js').Review;
const Reviewer = require('./mongoDb.js').Reviewer;
const addReviewAndUpdateRating = require('./mongoDb.js').addReviewAndUpdateRating;
const resetRating = require('./mongoDb.js').resetRating;
const faker = require('faker');
const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
const { Parser } = require('json2csv');
const { Client, Pool } = require('pg');
const couchbase = require('couchbase');
const { exec } = require('child_process');
dotenv.config();

// helper functions
const randomInclusiveInteger = (min, max, exceptions = []) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  while (exceptions.includes(randomInteger)) {
    randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomInteger;
};

const randomDate = (date1, date2) => {
  return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
};

const colors = [
  'rgb(77, 171, 101)',
  'rgb(156, 70, 127)',
  'rgb(240, 189, 79)',
  'rgb(115, 114, 108)',
  'rgb(40, 150, 169)'
];

const randomColor = () => {
  return colors[randomInclusiveInteger(0, colors.length - 1)];
};

let usedReviewerIds = {};
const generateRandomReviewer = () => {
  const randomReviewerId = crypto.createHash('md5').update(randomInclusiveInteger(0, 499999).toString()).digest('hex');
  usedReviewerIds[randomReviewerId] = usedReviewerIds[randomReviewerId] === undefined ? 1 : usedReviewerIds[randomReviewerId] + 1;
  const randomName = faker.name.findName();
  const randomAvatar = `https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar${randomInclusiveInteger(0, 999)}.jpg`;
  const avatars = [randomColor(), randomColor(), randomColor(), randomAvatar];
  const avatarOrNoAvatar = avatars[randomInclusiveInteger(0, 3)];

  const reviewCounts = usedReviewerIds[randomReviewerId];

  const randomNoOfCourses = randomInclusiveInteger(reviewCounts, reviewCounts + 3);
  const randomReviewer = {
    reviewerId: randomReviewerId,
    name: randomName,
    picture: avatarOrNoAvatar,
    coursesTaken: randomNoOfCourses,
    reviews: reviewCounts
  };
  return randomReviewer;
};

// create a random review for a given course ID
const generateRandomReview = (courseId) => {
  // make it likely for it to have good ratings
  const ratings = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1];
  const randomRating = ratings[randomInclusiveInteger(0, ratings.length - 1)];
  const randomComment = faker.lorem.text();
  // random date within 3 months
  const startTime = new Date('01 April 2021 00:00 UTC');
  const currentTime = new Date();
  const randomTime = randomDate(startTime, currentTime).toISOString();
  const randomHelpful = randomInclusiveInteger(1, 50);

  const randomReview = {
    courseId: courseId,
    rating: randomRating,
    comment: randomComment,
    createdAt: randomTime,
    helpful: randomHelpful,
    reported: false
  };

  return randomReview;
};

const generateRating = () => {
  return {
    overallRating: null,
    totalRatings: 0,
    totalStars: null,
    '5': 0,
    '4 1/2': 0,
    '4': 0,
    '3 1/2': 0,
    '3': 0,
    '2 1/2': 0,
    '2': 0,
    '1 1/2': 0,
    '1': 0
  };
};

const reformRating = (rating) => {
  const map = {
    '5': 'five',
    '4 1/2': 'fourhalf',
    '4': 'four',
    '3 1/2': 'threehalf',
    '3': 'three',
    '2 1/2': 'twohalf',
    '2': 'two',
    '1 1/2': 'onehalf',
    '1': 'one'
  };
  for (let key in map) {
    rating[map[key]] = rating[key];
    delete rating[key];
  }
  return rating;
};

// ------ SET ALL RATINGS TO 0 ------
const resetRatings = async (noOfCourses) => {
  for (let i = 1; i <= noOfCourses; i++) {
    await resetRating(i);
  }
};

// ------ ADD RANDOM REVIEWS TO DATABASE ------
const addRandomReviews = async (noOfCourses) => {
  for (let i = 1; i <= noOfCourses; i++) {
    if (i % 13 !== 0) {
      let randomNumberOfReviews = randomInclusiveInteger(1, 100); // creates a random number of reviews for current course
      for (let j = 0; j < randomNumberOfReviews; j++) {
        let randomReview = generateRandomReview(i);
        await addReviewAndUpdateRating(randomReview);
        console.log('Review added to database:', randomReview);
      }
    }
  }
};

// ------ RESET AND REPOPULATE DATABASE ------
const populateDatabase = async (noOfCourses) => {
  await Rating.countDocuments().then((results) => {
    if (results > 0) {
      Rating.collection.drop();
    }
  });
  await Review.countDocuments().then((results) => {
    if (results > 0) {
      Review.collection.drop();
    }
  });
  await Reviewer.countDocuments().then((results) => {
    if (results > 0) {
      Reviewer.collection.drop();
    }
  });
  await resetRatings(noOfCourses);
  await addRandomReviews(noOfCourses);
  console.log('Finished populating database');
};


const populateCouchbase = (noOfCourses) => {
  const cluster = new couchbase.Cluster('couchbase://localhost', {
    username: process.env.COUCH_USER,
    password: process.env.COUCH_PASS
  });

  const bucket = cluster.bucket('rpt27-sdc-websockets-reviews');
  const courseDocs = bucket.defaultCollection();

  for (let i = 1; i <= 100; i++) {
    console.log('uploading file ', i);
    exec(`"/Applications/Couchbase Server.app/Contents/Resources/couchbase-core/bin/cbimport" json -c couchbase://localhost -u ${process.env.COUCH_USER} -p ${process.env.COUCH_PASS} -b rpt27-sdc-websockets-reviews -d file:///data/nosqlData_${i}.json -f list -g key::%courseId%::#UUID#`, (err, stdout, stderr) => {
      if (err) {
        console.error('issue with couchbase file import: ', err);
      } else {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
      }
    });
  }
};

const createPostgresTables = (dbClient) => {
  const createReviewsTableSQL = `CREATE TABLE Reviews (
    id varchar(32),
    courseId int,
    reviewer varchar(32),
    rating int NOT NULL,
    comment varchar(4000),
    createdAt date,
    helpful int,
    reported boolean,
    PRIMARY KEY(id),
    CONSTRAINT fk_course FOREIGN KEY(courseId) REFERENCES ratings(courseId),
    CONSTRAINT fk_reviewer FOREIGN KEY(reviewer) REFERENCES reviewers(reviewerId)
  )`;
  const createReviewersTableSQL = `CREATE TABLE Reviewers (
    id varchar(32) NOT NULL UNIQUE,
    reviewerId varchar(32),
    name varchar(100) NOT NULL,
    picture varchar(100) NOT NULL,
    coursesTaken int NOT NULL,
    reviews int NOT NULL,
    PRIMARY KEY (reviewerId)
  )`;
  const createRatingsTableSQL = `CREATE TABLE Ratings (
    id varchar(32) NOT NULL UNIQUE,
    courseId int,
    overallRating decimal(2),
    totalRatings int,
    totalStars int,
    five int,
    fourhalf int,
    four int,
    threehalf int,
    three int,
    twohalf int,
    two int,
    onehalf int,
    one int,
    PRIMARY KEY (courseId)
  )`;

  return pool.query(createReviewersTableSQL)
    .then(res => console.log('created reviewers table'))
    .catch((err) => console.log('error creating reviewers table'))
    .then(() => pool.query(createRatingsTableSQL))
    .then(res => console.log('created ratings table'))
    .catch((err) => console.log('error creating ratings table'))
    .then(() => pool.query(createReviewsTableSQL))
    .then(res => console.log('created reviews table'))
    .catch((err) => console.log('error creating reviews table'));
};

const populatePostgresDB = async (noOfCourses) => {
  const pgURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5431/postgres`;
  const dbURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5431/udemy_reviews`;

  // Create Database
  const client = new Client({
    connectionString: pgURI
  });
  client.connect();
  await pgClient.query('CREATE DATABASE IF NOT EXISTS udemy_reviews')
    .then(() => {
      return new Pool({
        connectionString: dbURI
      });
    })
    .then((dbPool) => {
      return pool.query('DROP TABLE IF EXISTS ratings, reviewers, reviews');
    })
    .then();




  for (let i = 1; i <= noOfCourses; i++) {
    console.log(' creating reviews for course ', i);
    let ratings = reformRating(generateRating());
    const randReviewCount = randomInclusiveInteger(1, 30);

    let localReviews = [];
    let localReviewers = [];
    for (let j = 0; j < randReviewCount; j++) {
      let randomReview = generateRandomReview(i);
      let randomReviewer = generateRandomReviewer();
      randomReview.reviewer = randomReviewer.reviewerId;
      ratings.totalStars = ratings.totalStars === null ? randomReview.rating : ratings.totalStars + randomReview.rating;
      if (randomReview.rating === 5) {
        ratings.five += 1;
      } else if (randomReview.rating === 4.5) {
        ratings.fourhalf += 1;
      } else if (randomReview.rating === 4) {
        ratings.four += 1;
      } else if (randomReview.rating === 3.5) {
        ratings.threehalf += 1;
      } else if (randomReview.rating === 3) {
        ratings.three += 1;
      } else if (randomReview.rating === 2.5) {
        ratings.twohalf += 1;
      } else if (randomReview.rating === 2) {
        ratings.two += 1;
      } else if (randomReview.rating === 1.5) {
        ratings.onehalf += 1;
      } else if (randomReview.rating === 1) {
        ratings.one += 1;
      }

      localReviews.push(randomReview);
      localReviewers.push(randomReviewer);
    }

    // ensure rating is updated with aggregate review data
    ratings.totalRatings = randReviewCount;
    ratings.overallRating = ratings.totalStars / ratings.totalRatings;

    let insertIntoRatings = 'INSERT INTO reviewers VALUES(';
    for (let j = 0; i < 14; j++) {
      insertIntoRatings += `$${i + 1}, `;
    }
    insertIntoRatings += ') RETURNING *';
    const ratingsValues = [ratings.id, ratings.courseId, ratings.overallRating, ratings.totalRatings, ratings.totalStars, ratings.five, ratings.fourhalf, ratings.four, ratings.threehalf, ratings.three, ratings.twohalf, ratings.two, ratings.onehalf, ratings.one];
    await pool.query(insertIntoRatings, ratingsValues)
      .then((res) => {
        console.log('== posted rating to db ==', res);
      });

    let insertIntoReviewers = 'INSERT INTO reviewers VALUES(';
    for (let j = 0; i < 7; j++) {
      insertIntoReviewers += `$${i + 1}, `;
    }
    insertIntoReviewers += ') RETURNING *';
    for (let j = 0; j < localReviewers.length; j++) {
      const reviewersValues = [randomReviewer.id, randomReviewer.reviewerId, randomReviewer.name, randomReviewer.picture, randomReviewer.coursesTaken, randomReviewer.reviews];
      await pool.query(insertIntoReviewers, reviewersValues);
    }

    let insertIntoReviews = 'INSERT INTO reviewers VALUES(';
    for (let j = 0; i < 8; j++) {
      insertIntoReviews += `$${i + 1}, `;
    }
    insertIntoReviews += ') RETURNING *';
    for (let j = 0; j < localReviews.length; j++) {
      const reviewsValues = [randomReview.id, randomReview.courseId, randomReview.reviewer, randomReview.rating, randomReview.comment, randomReview.createdAt, randomReview.helpful, randomReview.reported];
      await pool.query(insertIntoReviews, reviewsValues);
    }

    console.log('Finished uploading for course', i);
  }
};

const createJSONdoc = (noOfCourses) => {
  let tempDataStore = [];
  for (let i = 1; i <= noOfCourses; i++) {
    let doc = {
      ratings: generateRating(),
      reviews: [],
      courseId: i
    };
    const randReviewCount = randomInclusiveInteger(1, 10);
    for (let j = 0; j < randReviewCount; j++) {
      let randomReview = generateRandomReview(i);
      randomReview.reviewer = generateRandomReviewer();
      doc.ratings.totalStars = doc.ratings.totalStars === null ? randomReview.rating : doc.ratings.totalStars + randomReview.rating;
      if (randomReview.rating === 5) {
        doc.ratings['5'] += 1;
      } else if (randomReview.rating === 4.5) {
        doc.ratings['4 1/2'] += 1;
      } else if (randomReview.rating === 4) {
        doc.ratings['4'] += 1;
      } else if (randomReview.rating === 3.5) {
        doc.ratings['3 1/2'] += 1;
      } else if (randomReview.rating === 3) {
        doc.ratings['3'] += 1;
      } else if (randomReview.rating === 2.5) {
        doc.ratings['2 1/2'] += 1;
      } else if (randomReview.rating === 2) {
        doc.ratings['2'] += 1;
      } else if (randomReview.rating === 1.5) {
        doc.ratings['1 1/2'] += 1;
      } else if (randomReview.rating === 1) {
        doc.ratings['1'] += 1;
      }
      doc.reviews.push(randomReview);
    }
    // ensure rating is updated with aggregate review data
    doc.ratings.totalRatings = randReviewCount;
    doc.ratings.overallRating = doc.ratings.totalStars / doc.ratings.totalRatings;

    // save doc to local array
    tempDataStore.push(doc);

    if (i % 10000 === 0) {
      console.log(`finished with ${i}/10,000,000 records`);
    }
    if (i % 100000 === 0) {
      fs.writeFileSync(`data/nosqlData_${i / 100000}.json`, JSON.stringify(tempDataStore, null, ' '), (err) => {
        if (err) {
          console.log('error with writing noSQL data file: ', err);
        } else {
          console.log('noSQL data file saved!');
        }
      });
      tempDataStore = [];
    }
  }
};

createCSVdoc = (noOfCourses) => {
  const reviewParser = new Parser({ fields: ['id', 'courseId', 'reviewer', 'rating', 'comment', 'createdAt', 'helpful', 'reported'] });
  const reviewerParser = new Parser({ fields: ['id', 'reviewerId', 'name', 'picture', 'coursesTaken', 'reviews'] });
  const ratingParser = new Parser({ fields: ['id', 'courseId', 'overallRating', 'totalRatings', 'totalStars', 'five', 'fourhalf', 'four', 'threehalf', 'three', 'twohalf', 'two', 'onehalf', 'one'] });

  for (let i = 1; i <= noOfCourses; i++) {
    console.log(' creating reviews for course ', i);
    let ratings = reformRating(generateRating());
    const randReviewCount = randomInclusiveInteger(1, 10);

    let localReviews = [];
    let localReviewers = [];
    let localRatings = [];
    for (let j = 0; j < randReviewCount; j++) {
      let randomReview = generateRandomReview(i);
      let randomReviewer = generateRandomReviewer();
      randomReview.reviewer = randomReviewer.reviewerId;
      ratings.totalStars = ratings.totalStars === null ? randomReview.rating : ratings.totalStars + randomReview.rating;
      if (randomReview.rating === 5) {
        ratings.five += 1;
      } else if (randomReview.rating === 4.5) {
        ratings.fourhalf += 1;
      } else if (randomReview.rating === 4) {
        ratings.four += 1;
      } else if (randomReview.rating === 3.5) {
        ratings.threehalf += 1;
      } else if (randomReview.rating === 3) {
        ratings.three += 1;
      } else if (randomReview.rating === 2.5) {
        ratings.twohalf += 1;
      } else if (randomReview.rating === 2) {
        ratings.two += 1;
      } else if (randomReview.rating === 1.5) {
        ratings.onehalf += 1;
      } else if (randomReview.rating === 1) {
        ratings.one += 1;
      }

      localReviews.push(randomReview);
      localReviewers.push(randomReviewer);
    }

    // ensure rating is updated with aggregate review data
    ratings.totalRatings = randReviewCount;
    ratings.overallRating = ratings.totalStars / ratings.totalRatings;

    localRatings.push(ratings);

    console.log('Finished uploading for course', i);

    if (i % 10000 === 0) {
      const reviewCSV = parser.parse(localReviews);
      const reviewerCSV = parser.parse(localReviewers);

      fs.writeFile(`data/sqlData_reviews_${i / 10000}.csv`, reviewCSV, (err) => {
        if (err) {
          console.log('error with writing review data file: ', err);
        } else {
          console.log('review data file saved!');
        }
      });
      localReviews = [];

      fs.writeFile(`data/sqlData_reviewers_${i / 10000}.csv`, reviewerCSV, (err) => {
        if (err) {
          console.log('error with writing reviewer data file: ', err);
        } else {
          console.log('reviewer data file saved!');
        }
      });
      localReviewers = [];
    } else if (i % 100000 === 0) {
      const ratingCSV = parser.parse(localRatings);
      fs.writeFile(`data/sqlData_ratings_${i / 100000}.csv`, ratingCSV, (err) => {
        if (err) {
          console.log('error with writing rating data file: ', err);
        } else {
          console.log('rating data file saved!');
        }
      });
      localRatings = [];
    }
  }
};
// === ACTIVATE HERE === (node database/dataGenerators.js)
// populateDatabase(100);
// populateCouchDB(10000000);
// populatePostgresDB(2);
// createJSONdoc(10000000);
populateCouchbase();

