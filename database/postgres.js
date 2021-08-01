const { Sequelize, DataTypes } = require('sequelize');
const { Client, Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const faker = require('faker');
const crypto = require('crypto');
const fs = require('fs');
const Stream = require('stream');
const zlib = require('zlib');
const { exec } = require('child_process');
const os = require('os');

// ***** DATA GENERATION HELPER FUNCTIONS *****
const randomInclusiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

const num2Word = (num) => {
  const map = {
    '5': 'five',
    '4.5': 'fourhalf',
    '4': 'four',
    '3.5': 'threehalf',
    '3': 'three',
    '2.5': 'twohalf',
    '2': 'two',
    '1.5': 'onehalf',
    '1': 'one'
  };
  return map[num];
};

const stringifyDocument = (doc) => {
  const returnStr = Object.values(doc).reduce((memo, value) => memo ? memo + `|${value}` : `${value}`, '');
  return returnStr;
};

// ***** DATA GENERATION SCHEMA BUILDERS *****
// store a subset of reviewers to keep the courseCount and reviewCount accurate on records
let reviewerArr = [];
const generateRandomReviewer = (i) => {
  // constant reviewer attributes
  // create a uuid hash for user id
  const reviewerId = crypto.createHash('md5').update(i.toString()).digest('hex');
  const name = faker.name.findName();
  const avatarOpts = [randomColor(), randomColor(), randomColor(), `https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar${randomInclusiveInteger(0, 999)}.jpg`];
  const avatar = avatarOpts[randomInclusiveInteger(0, 3)];

  // changing reviewer attribues
  const reviewCounts = 0;
  const coursesTaken = 0;

  const reviewerObj = {
    reviewerId,
    name,
    picture: avatar,
    coursesTaken,
    reviews: reviewCounts
  };

  reviewerArr.push(reviewerObj);
};

const generateRandomReview = (courseId, i) => {
  // make it likely to have a good rating
  const reviewId = crypto.createHash('md5').update(`course${courseId}_review${i}`).digest('hex');
  const ratingOpts = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1];
  const rating = ratingOpts[randomInclusiveInteger(0, ratingOpts.length - 1)];
  const comment = faker.lorem.text().replace(/(?:\r\n|\r|\n)/g, '<br>');
  // random date within 3 months
  const createdAt = randomDate(new Date('01 May 2021 00:00 UTC'), new Date()).toISOString();
  const helpful = randomInclusiveInteger(1, 50);

  return {
    reviewId,
    courseId,
    rating,
    comment,
    createdAt,
    helpful,
    reported: false
  };
};

const generateRating = (courseId) => {
  return {
    courseId,
    totalRatings: 0,
    totalStars: null,
    overallRating: null,
    five: 0,
    fourhalf: 0,
    four: 0,
    threehalf: 0,
    three: 0,
    twohalf: 0,
    two: 0,
    onehalf: 0,
    one: 0
  };
};

let reviewArr = [];
let courseArr = [];
const generateCourse = (courseId) => {
  let ratings = generateRating(courseId);
  const randomReviewCount = randomInclusiveInteger(5, 30);
  for (let i = 0; i < randomReviewCount; i++) {
    let review = generateRandomReview(courseId, i);
    let randomReviewerNum = randomInclusiveInteger(0, 9999);
    // update locally stored reviewer object with added review count
    let tempStore = reviewerArr[randomReviewerNum].reviews + 1;
    reviewerArr[randomReviewerNum].reviews += 1;
    reviewerArr[randomReviewerNum].coursesTaken = randomInclusiveInteger(tempStore, tempStore + 3);
    // add reviewer reference to review
    review.reviewer = reviewerArr[randomReviewerNum].reviewerId;
    // update rating values
    ratings.totalStars = ratings.totalStars === null ? review.rating : ratings.totalStars + review.rating;
    ratings[num2Word(review.rating)] += 1;
    // push review to doc object
    // doc.reviews.push(review);
    reviewArr.push(stringifyDocument(review));
  }

  // update aggregate scoring on rating property
  ratings.totalRatings = randomReviewCount;
  ratings.overallRating = ratings.totalStars / ratings.totalRatings;

  // return JSON object
  courseArr.push(stringifyDocument(ratings));
};


// ***** EXECUTION SCRIPTS *****
const generateReviewers = (start = 1, numCourses) => {
  reviewerObj = [];
  for (let j = start; j < numCourses; j++) {
    reviewerObj.push(generateRandomReviewer(j));
  }
};


const populateReviewerCSV = (reviewers) => {
  reviewers = 'reviewerId|name|picture|coursesTaken|reviews\n' + reviewers;;
  const writableReviewerStream = fs.createWriteStream(path.join('/tmp', 'reviewers.csv'))
    .on('error', (err) => console.error('error with reviewer stream: ', err.message));
  writableReviewerStream.write(reviewers);
  writableReviewerStream.end();
};

const populateCourseCSV = (courses) => {
  courses = 'courseId|totalRatings|totalStars|overallRatings|five|fourhalf|four|threehalf|three|twohalf|two|onehalf|one\n' + courses;
  const writableCourseStream = fs.createWriteStream(path.join('/tmp', 'courses.csv'))
    .on('error', (err) => console.error('error with courses stream: ', err.message));
  writableCourseStream.write(courses);
  writableCourseStream.end();
};

const populateReviewCSV = (reviews) => {
  reviews = 'id|courseId|rating|comment|createdAt|helpful|reported|reviewer\n' + reviews;
  const writableReviewStream = fs.createWriteStream(path.join('/tmp', 'reviews.csv'))
    .on('error', (err) => console.error('error with reviews stream: ', err.message));
  writableReviewStream.write(reviews);
  writableReviewStream.end();
};



const createCSVdocs = async (start = 1, numCourses, refresh) => {
  if (refresh) {
    await setupPostgresDB(refresh);
  }

  let i = start;
  const increment = 25000;

  while (i <= numCourses) {
    // create and update courses, reviews, reviewers
    generateReviewers(i, i + increment);
    console.log('starting courses at ', i);
    for (let j = i; j < i + increment; j++) {
      generateCourse(j);
    }

    // stringify data
    const stringReviews = reviewArr.join('\n');
    const stringCourses = courseArr.join('\n');
    const stringReviewers = reviewerArr.map(reviewer => stringifyDocument(reviewer)).join('\n');

    populateCourseCSV(stringCourses);
    populateReviewerCSV(stringReviewers);
    populateReviewCSV(stringReviews);

    reviewerArr = [];
    reviewArr = [];
    courseArr = [];

    await writeCSVtoPostgres();

    i += increment;
    console.log(`============  ${i}  ============`);
  }
};

const createPostgresTables = async () => {
  const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/udemy_reviews`);

  const Ratings = sequelize.define('ratings', {
    courseId: { type: DataTypes.INTEGER, primaryKey: true },
    totalRatings: { type: DataTypes.INTEGER },
    totalStars: { type: DataTypes.DOUBLE },
    // overallRatings: { type: 'DOUBLE PRECISION GENERATED ALWAYS AS ("totalStars" / "totalRatings") STORED' },
    overallRatings: { type: DataTypes.DOUBLE },
    five: { type: DataTypes.INTEGER },
    fourhalf: { type: DataTypes.INTEGER },
    four: { type: DataTypes.INTEGER },
    threehalf: { type: DataTypes.INTEGER },
    three: { type: DataTypes.INTEGER },
    twohalf: { type: DataTypes.INTEGER },
    two: { type: DataTypes.INTEGER },
    onehalf: { type: DataTypes.INTEGER },
    one: { type: DataTypes.INTEGER },
  }, { timestamps: false });
  const Reviewers = sequelize.define('reviewers', {
    reviewerId: { type: DataTypes.STRING(64), primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: false },
    coursesTaken: { type: DataTypes.INTEGER, allowNull: false },
    reviews: { type: DataTypes.INTEGER, allowNull: false }
  }, { timestamps: false });
  const Reviews = sequelize.define('reviews', {
    id: { type: DataTypes.STRING(64), primaryKey: true },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ratings,
        key: 'courseId'
      }
    },
    rating: { type: DataTypes.DOUBLE, allowNull: false },
    comment: { type: DataTypes.STRING(4000) },
    createdAt: { type: DataTypes.STRING(64) },
    helpful: { type: DataTypes.INTEGER },
    reported: { type: DataTypes.BOOLEAN },
    reviewer: {
      type: DataTypes.STRING(64),
      references: {
        model: Reviewers,
        key: 'reviewerId'
      }
    }
  }, { timestamps: false });

  await sequelize.sync();
  console.log('all tables were just synced in udemy_reviews');

  let returnObj = {
    sequelize,
    Ratings,
    Reviewers,
    Reviews
  };
  return returnObj;
};

const writeCSVtoPostgres = async () => {
  const pool = new Pool({
    host: 'localhost',
    database: 'udemy_reviews',
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  });

  await pool.query(`COPY ratings FROM '${path.join('/tmp', 'courses.csv')}' DELIMITER '|' CSV HEADER`);
  console.log('wrote ratings');
  await pool.query(`COPY reviewers FROM '${path.join('/tmp', 'reviewers.csv')}' DELIMITER '|' CSV HEADER`);
  console.log('wrote reviewers');
  await pool.query(`COPY reviews FROM '${path.join('/tmp', 'reviews.csv')}' DELIMITER '|' CSV HEADER`);
  console.log('wrote reviews');
};

const setupPostgresDB = async (refresh) => {
  console.log('starting postgres seeding');
  const pgURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432`;

  // Create db
  if (refresh) {
    const client = new Client({
      connectionString: pgURI
    });
    client.connect();
    await client.query('CREATE DATABASE IF NOT EXISTS udemy_reviews')
      .catch(async () => {
        console.log('DATABASE  already exists');
        await client.query('DROP DATABASE udemy_reviews');
        throw 'create db';
      })
      .catch(() => client.query('CREATE DATABASE udemy_reviews'));

    await createPostgresTables();
  }
};

createCSVdocs(1, 1000000, true);