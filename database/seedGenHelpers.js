const dotenv = require('dotenv');
dotenv.config();
const faker = require('faker');
const crypto = require('crypto');

module.exports.randomInclusiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.randomDate = (date1, date2) => {
  return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));
};

module.exports.colors = [
  'rgb(77, 171, 101)',
  'rgb(156, 70, 127)',
  'rgb(240, 189, 79)',
  'rgb(115, 114, 108)',
  'rgb(40, 150, 169)'
];

module.exports.randomColor = () => {
  return colors[randomInclusiveInteger(0, colors.length - 1)];
};

module.exports.num2Word = (num) => {
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

module.exports.stringifyDocument = (doc) => {
  const returnStr = Object.values(doc).reduce((memo, value) => memo ? memo + `|${value}` : `${value}`, '');
  return returnStr;
};





module.exports.generateRandomReviewer = (i) => {
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

  return reviewerObj;
};

module.exports.generateRandomReview = (courseId, i) => {
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

module.exports.generateRating = (courseId) => {
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