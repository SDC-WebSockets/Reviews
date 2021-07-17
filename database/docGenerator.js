const faker = require('faker');
const crypto = require('crypto');
const fs = require('fs');
const dotenv = require('dotenv');
const Stream = require('stream');
const zlib = require('zlib');
const gz = zlib.createGzip();
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { exec } = require('child_process');
dotenv.config();

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

// ***** DATA GENERATION SCHEMA BUILDERS *****

// store a subset of reviewers to keep the courseCount and reviewCount accurate on records
let reviewerObj = [];
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

  return {
    reviewerId,
    name,
    picture: avatar,
    coursesTaken,
    reviews: reviewCounts
  };
};

const generateRandomReview = (courseId) => {
  // make it likely to have a good rating
  const ratingOpts = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1];
  const rating = ratings[randomInclusiveInteger(0, ratings.length - 1)];
  const comment = faker.lorem.text().replace(/(?:\r\n|\r|\n)/g, '<br>');
  // random date within 3 months
  const createdAt = randomDate(new Date('01 May 2021 00:00 UTC'), new Date()).toISOString();
  const helpful = randomInclusiveInteger(1, 50);

  return {
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
    overallRating: null,
    totalRatings: 0,
    totalStars: null,
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

const generateJSONCourse = (courseId, start) => {
  let doc = {
    ratings: generateRating(courseId),
    reviews: [],
    courseId
  };
  const randomReviewCount = randomInclusiveInteger(5, 30);
  for (let i = 0; i < randomReviewCount; i++) {
    let review = generateRandomReview(courseId);
    let randomReviewerNum = randomInclusiveInteger(0, 999);
    // update locally stored reviewer object with added review count
    let tempStore = reviewerObj[randomReviewerNum].reviews + 1;
    reviewerObj[randomReviewerNum].reviews += 1;
    reviewerObj[randomReviewerNum].coursesTaken = randomInclusiveInteger(tempStore, tempStore + 3);
    // add reviewer reference to review
    review.reviewer = reviewerObj[randomReviewerNum];
    // update rating values
    doc.ratings.totalStars = doc.ratings.totalStars === null ? review.rating : doc.ratings.totalStars + review.rating;
    doc.ratings[num2Word(review.rating)] += 1;
    // push review to doc object
    doc.reviews.push(review);
  }

  // update aggregate scoring on rating property
  doc.ratings.totalRatings = randomReviewCount;
  doc.ratings.overallRating = doc.ratings.totalStars / doc.ratings.totalRatings;

  // return JSON object
  return JSON.stringify(doc);
};

const populateDocStore = async (start = 1, numCourses) => {
  let i = start;
  let fileN = Math.floor(start / 10000);

  // control stream of input data with an interval
  const timedStreamFeeder = setInterval(async () => {
    // setup for round 1
    if (i === 1) {
      await exec(`mkdir data/cbImport/docs${fileN}`);
      reviewerObj = [];
      for (let j = 0; j < 1000; j++) {
        reviewerObj.push(generateRandomReviewer(j));
      }
    }
    // clear and reset locally stored reviewers every 1k courses
    if (i % 1000 === 0) {
      reviewerObj = [];
      for (let j = i; j < i + 1000; j++) {
        reviewerObj.push(generateRandomReviewer(j));
      }
    }
    // compress file every 10k records and create next folder
    if (i % 10000 === 0) {
      console.log(`writing zip file docs${fileN}`);
      await exec(`zip -r docs${fileN}.zip data/cbImport/docs${fileN}/`);
      fileN = fileN === 9 ? 0 : fileN + 1;
      await exec(`mkdir data/cbImport/docs${fileN}`);
      await setTimeout(() => {}, 100);
    }
    // write to couchbase and clear local files every 100k records
    if (i % 100000 === 0) {
      console.log(`milestone: ${i} courses written to couchbase`);
      for (let file = 0; file < 10; file++) {
        await exec(`rm -rf data/cbImport/docs${file}`);
      }
      await exec('sh cbupload.sh', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
        } else {
          console.log('posted 100k records to couchbase');
        }
      });
    }
    // once number of courses is reached, clear timeout
    if (i === numCourses) {
      clearInterval(timedStreamFeeder);
    }

    // use a writable stream to generate data files
    const writableStream = fs.createWriteStream(`data/cbImport/docs${fileN}/courseReviews${i}.json`)
      .on('error', (err) => console.error(err.message));
    writableStream.write(generateJSONCourse(i));
    writableStream.end();
    i++;
  }, 5);
};

// ***** EXECUTION *****
populateDocStore(1000);