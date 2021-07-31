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
  const rating = ratingOpts[randomInclusiveInteger(0, ratingOpts.length - 1)];
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
    let randomReviewerNum = randomInclusiveInteger(0, 9999);
    // update locally stored reviewer object with added review count
    let tempStore = reviewerObj[randomReviewerNum].reviews + 1;
    reviewerObj[randomReviewerNum].reviews += 1;
    reviewerObj[randomReviewerNum].coursesTaken = randomInclusiveInteger(tempStore, tempStore + 3);
    // add reviewer reference to review
    review.reviewer = reviewerObj[randomReviewerNum].reviewerId;
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


// ***** EXECUTION SCRIPTS *****

const generateReviewers = (start = 1, numCourses) => {
  reviewerObj = [];
  for (let j = start; j <= numCourses; j++) {
    reviewerObj.push(generateRandomReviewer(j));
  }
};

const populateReviewerStore = async (start = 1, numCourses, fileN) => {
  let i = start;
  let revieweri = 0;

  // control stream of input data with an interval
  await new Promise((resolve, reject) => {
    const timedStreamFeeder = setInterval(async () => {
      for (let j = 0; j < 5; j ++) {
        // use a writable stream to generate data files
        const writableReviewerStream = fs.createWriteStream(`data/cbImport/reviewerdocs${fileN}/reviewer${i}.json`)
        .on('error', (err) => console.error('error with reviewer stream: ', err.message));
        writableReviewerStream.write(JSON.stringify(reviewerObj[revieweri]));
        writableReviewerStream.end();

        i++;
        revieweri++;

        // once number of courses is reached, clear timeout
        if (i === numCourses) {
          clearInterval(timedStreamFeeder);
          exec(`zip -r reviewerdocs${fileN}.zip data/cbImport/reviewerdocs${fileN}/`);
          resolve('finished');
        }
      }
    }, 1);
  });
};

const runTimedFeed = (start, numCourses, fileN) => {
  return new Promise((resolve, reject) => {
    let i = start;

    // control stream of input data with an interval
    const timedStreamFeeder = setInterval(async () => {
      for (let j = 0; j < 10; j++) {

        // use a writable stream to generate data files
        const writableStream = fs.createWriteStream(`data/cbImport/docs${fileN}/courseReviews${i}.json`)
        .on('error', (err) => console.error('error with course stream:', err.message));
        writableStream.write(generateJSONCourse(i));
        writableStream.end();

        i++;

        // compress file every 10k records and create next folder
        // once number of courses is reached, clear timeout
        if (i === numCourses) {
          clearInterval(timedStreamFeeder);
          exec(`zip -r docs${fileN}.zip data/cbImport/docs${fileN}/`);
          resolve('done');
        }
      }
    }, 1);
  });
};

const write2couch = () => {
  return new Promise((resolve, reject) => {
    exec('sh cbupload.sh', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject('failed');
      } else {
        console.log('posted 100k records to couchbase');
        resolve('succeeded');
      }
    });
  });
};

const createDirectories = () => {
  return new Promise((resolve, reject) => {
    let count = 0;
    for (let j = 0; j < 10; j++) {
      exec(`mkdir data/cbImport/docs${j}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          count++;
        }
      });
      exec(`mkdir data/cbImport/reviewerdocs${j}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          count++;
        }
      });
    }
    if (count === 20) {
      resolve('finished creating directories');
    } else {
      reject(`failed to create directories: only created ${count}`);
    }
  });
};

const clearDirectories = () => {
  return new Promise((resolve, reject) => {
    for (let file = 0; file < 10; file++) {
      // rm -rfv dontDeleteMe/*
      exec(`rm -rfv data/cbImport/docs${file}/*`);
      exec(`rm -rfv data/cbImport/reviewerdocs${file}/*`);
    }
    resolve('finished clearing directories');
  });
};

const populateDocStore = async (start = 1, numCourses) => {
  let i = start;
  let fileN = Math.floor(start / 10000);

  for (let j = 0; j < 10; j++) {
    exec(`mkdir data/cbImport/docs${j}`);
    exec(`mkdir data/cbImport/reviewerdocs${j}`);
  }
  // await createDirectories();

  while (i <= numCourses) {
    generateReviewers(i, i + 10000);
    await runTimedFeed(i, i + 10000, fileN);
    await populateReviewerStore(i, i + 10000, fileN);

    fileN = fileN === 9 ? 0 : fileN + 1;
    i += 10000;
    console.log(`============  ${i}  ============`);

    // write to couchbase and clear local files every 100k records
    if ((i - 1) % 100000 === 0) {
      console.log(`milestone: ${i} courses written to couchbase`);
      await clearDirectories();
      // for (let file = 0; file < 10; file++) {
      //   exec(`rm -rf data/cbImport/docs${file}`);
      //   exec(`rm -rd data/cbImport/reviewerdocs${file}`);
      // }
      // exec('sh cbupload.sh', (err, stdout, stderr) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log('posted 100k records to couchbase');
      //   }
      // });
      await write2couch();
      // await createDirectories();
      // for (let j = 0; j < 10; j++) {
      //   exec(`mkdir data/cbImport/docs${j}`);
      //   exec(`mkdir data/cbImport/reviewerdocs${j}`);
      // }
    }
  }
};

// ***** EXECUTION *****
populateDocStore(1, 1000000);