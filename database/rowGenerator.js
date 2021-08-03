// Generate data for Postgres

const { sequelize, Reviews, Reviewers, Ratings } = require('./postgres.js');
const { Client, Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const fs = require('fs');
const seedHelpers = require('./seedGenHelpers.js');


// ***** DATA GENERATION SCHEMA BUILDERS *****
let reviewerArr = [];
let reviewArr = [];
let courseArr = [];

const generateCourse = (courseId) => {
  // get course object
  let ratings = seedHelpers.generateRating(courseId);

  // create reviews for course
  const randomReviewCount = seedHelpers.randomInclusiveInteger(5, 30);
  for (let i = 0; i < randomReviewCount; i++) {
    let review = seedHelpers.generateRandomReview(courseId, i);

    // get reviewer for review
    let randomReviewerNum = seedHelpers.randomInclusiveInteger(0, 9999);
    let tempStore = reviewerArr[randomReviewerNum].reviews + 1;
    reviewerArr[randomReviewerNum].reviews += 1;
    reviewerArr[randomReviewerNum].coursesTaken = seedHelpers.randomInclusiveInteger(tempStore, tempStore + 3);
    review.reviewer = reviewerArr[randomReviewerNum].reviewerId;

    // update rating values
    ratings.totalStars = ratings.totalStars === null ? review.rating : ratings.totalStars + review.rating;
    ratings[seedHelpers.num2Word(review.rating)] += 1;

    // push review to doc object
    reviewArr.push(seedHelpers.stringifyDocument(review));
  }

  // update aggregate scoring on rating property
  ratings.totalRatings = randomReviewCount;
  // ratings.overallRating = ratings.totalStars / ratings.totalRatings;

  courseArr.push(seedHelpers.stringifyDocument(ratings));
};


// ***** EXECUTION SCRIPTS *****
const generateReviewers = (start = 1, numCourses) => {
  reviewerObj = [];
  for (let j = start; j < numCourses; j++) {
    reviewerArr.push(seedHelpers.generateRandomReviewer(j));
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
  courses = 'courseId|totalRatings|totalStars|five|fourhalf|four|threehalf|three|twohalf|two|onehalf|one\n' + courses;
  // courses = 'courseId|totalRatings|totalStars|overallRatings|five|fourhalf|four|threehalf|three|twohalf|two|onehalf|one\n' + courses;
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
    generateReviewers(i, i + increment);
    for (let j = i; j < i + increment; j++) {
      generateCourse(j);
    }

    // stringify data
    const stringReviews = reviewArr.join('\n');
    const stringCourses = courseArr.join('\n');
    const stringReviewers = reviewerArr.map(reviewer => seedHelpers.stringifyDocument(reviewer)).join('\n');

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
    await sequelize.sync();
    console.log('all tables were just synced in udemy_reviews');
  }
};

createCSVdocs(1, 1000000, false);