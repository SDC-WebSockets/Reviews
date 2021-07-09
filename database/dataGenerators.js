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
const { parseAsync } = require('json2csv');
const { Client, Pool } = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
const couchbase = require('couchbase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
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
    exec(`"/Applications/Couchbase Server.app/Contents/Resources/couchbase-core/bin/cbimport" json -c couchbase://localhost -u ${process.env.COUCH_USER} -p ${process.env.COUCH_PASS} -b rpt27-sdc-websockets-reviews -d file://${path.join(__dirname, `/data/nosqlData_${i}.json`)} -f list -g key::%courseId%::#UUID#`, (err, stdout, stderr) => {
      if (err) {
        console.error('issue with couchbase file import: ', err);
      } else {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
      }
    });
  }
};

const createPostgresTables = async () => {
  const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5431/udemy_reviews`);

  const Ratings = sequelize.define('Ratings', {
    id: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    courseId: { type: DataTypes.INTEGER, primaryKey: true },
    overallRating: { type: DataTypes.DOUBLE },
    totalRatings: { type: DataTypes.INTEGER },
    totalStars: { type: DataTypes.INTEGER },
    five: { type: DataTypes.INTEGER },
    fourhalf: { type: DataTypes.INTEGER },
    four: { type: DataTypes.INTEGER },
    threehalf: { type: DataTypes.INTEGER },
    three: { type: DataTypes.INTEGER },
    twohalf: { type: DataTypes.INTEGER },
    two: { type: DataTypes.INTEGER },
    onehalf: { type: DataTypes.INTEGER },
    one: { type: DataTypes.INTEGER }
  });
  const Reviewers = sequelize.define('Reviewers', {
    id: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    reviewerId: { type: DataTypes.STRING(32), primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: false },
    coursesTaken: { type: DataTypes.INTEGER, allowNull: false },
    reviews: { type: DataTypes.INTEGER, allowNull: false }
  });
  const Reviews = sequelize.define('Reviews', {
    id: { type: DataTypes.STRING(64), primaryKey: true },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ratings,
        key: 'courseId'
      }
    },
    reviewer: {
      type: DataTypes.STRING(32),
      references: {
        model: Reviewers,
        key: 'reviewerId'
      }
    },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING(4000) },
    createdAt: { type: DataTypes.DATE },
    helpful: { type: DataTypes.INTEGER },
    reported: { type: DataTypes.BOOLEAN }
  });

  await sequelize.sync();
  console.log('all tables were just synced in udemy_reviews!');

  return {
    sequelize,
    Ratings,
    Reviewers,
    Reviews
  };
};

const populatePostgresDB = async (noOfCourses, refresh) => {
  console.log('starting postgres seeding');
  const pgURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5431`;
  const dbURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5431/udemy_reviews`;

  // Create Database
  if (refresh) {
    const client = new Client({
      connectionString: pgURI
    });
    client.connect();
    await client.query('CREATE DATABASE IF NOT EXISTS udemy_reviews')
      .catch(async () => {
        console.log('DATABASE already exists');
        await client.query('DROP DATABASE udemy_reviews');
        throw 'create db';
      })
      .catch(() => client.query('CREATE DATABASE udemy_reviews'));
  }

  const { sequelize, Ratings, Reviewers, Reviews } = await createPostgresTables();

  const pool = new Pool({
    host: 'localhost',
    database: 'udemy_reviews'
  });

  // verify setup
  const reviews = await Reviews.findAll();
  const reviewers = await Reviewers.findAll();
  const ratings = await Ratings.findAll();

  for (let i = 1; i <= noOfCourses / 10000; i++) {
    console.log(' importing reviews for course ', i);
    let ratingsFile = `sqlData_ratings_${i / 10}.csv`;
    let reviewsFile = `sqlData_reviews_${i}.csv`;
    let reviewersFile = `sqlData_reviewers_${i}.csv`;

    await pool.query(`COPY ratings FROM '${path.join(__dirname, '..', `/data/${ratingsFile}`)}' DELIMITER ',' CSV HEADER`);
    await pool.query(`COPY reviews FROM '${path.join(__dirname, '..', `/data/${reviewsFile}`)}' DELIMITER ',' CSV HEADER`);
    await pool.query(`COPY reviewers FROM '${path.join(__dirname, '..', `/data/${reviewersFile}`)}' DELIMITER ',' CSV HEADER`);
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

const createCSVdoc = async (noOfCourses) => {
  let localReviews = [];
  let localReviewers = [];
  let localRatings = [];

  const reviewOpts = { fields: ['id', 'courseId', 'reviewer', 'rating', 'comment', 'createdAt', 'helpful', 'reported'] };
  const reviewerOpts = { fields: ['id', 'reviewerId', 'name', 'picture', 'coursesTaken', 'reviews'] };
  const ratingOpts = { fields: ['id', 'courseId', 'overallRating', 'totalRatings', 'totalStars', 'five', 'fourhalf', 'four', 'threehalf', 'three', 'twohalf', 'two', 'onehalf', 'one'] };

  for (let i = 1; i <= noOfCourses; i++) {
    console.log(' creating reviews for course ', i);
    let ratings = reformRating(generateRating());
    ratings.id = uuidv4();
    const randReviewCount = randomInclusiveInteger(1, 10);

    for (let j = 0; j < randReviewCount; j++) {
      let randomReview = generateRandomReview(i);
      randomReview.id = uuidv4();
      let randomReviewer = generateRandomReviewer();
      randomReviewer.id = uuidv4();
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

    if (i % 10000 === 0) {
      await parseAsync(localReviews, reviewOpts)
        .then(csv => {
          return fs.writeFileSync(`data/sqlData_reviews_${i / 10000}.csv`, csv, (err) => {
            if (err) {
              console.log('error with writing review data file: ', err);
            } else {
              console.log('review data file saved!');
            }
          });
        })
        .catch(err => console.error(err));

      await parseAsync(localReviewers, reviewerOpts)
        .then(csv => {
          return fs.writeFileSync(`data/sqlData_reviewers_${i / 10000}.csv`, csv, (err) => {
            if (err) {
              console.log('error with writing reviewer data file: ', err);
            } else {
              console.log('reviewer data file saved!');
            }
          });
        })
        .catch(err => console.error(err));
      await parseAsync(localRatings, ratingOpts)
        .then(csv => {
          return fs.writeFileSync(`data/sqlData_ratings_${i / 100000}.csv`, csv, (err) => {
            if (err) {
              console.log('error with writing rating data file: ', err);
            } else {
              console.log('rating data file saved!');
            }
          });
        })
        .catch(err => console.error(err));
      localRatings = [];
      localReviews = [];
      localReviewers = [];
    } else if (i % 10000 === 0) {

    }
  }
};
// === ACTIVATE HERE === (node database/dataGenerators.js)
// populateDatabase(100);
// populateCouchDB(10000000);
// populatePostgresDB(2);
// createJSONdoc(10000000);
// populateCouchbase();
// createCSVdoc(10000000);

populatePostgresDB(10000000, true);
