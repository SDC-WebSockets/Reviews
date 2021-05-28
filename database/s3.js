const AWS = require('aws-sdk');
const path = require('path');
const AWSconfig = require('../AWS/s3config.js');
const mongoDb = require('../database/mongoDb.js');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1',
  accessKeyId: AWSconfig.AWSAccessKeyId,
  secretAccessKey: AWSconfig.AWSSecretKey
});

const bucketName = 'reviews-ratings-charlotte-badger';

const createBucket = async (bucket) => {
  await s3.createBucket({Bucket: bucket}, (err, data) => {
    err ? console.log('Error:', err) : console.log('Bucket URL:', data.Location);
  });
};

const emptyBucket = async (bucket) => {
  await s3.deleteObjects({Bucket: bucket, Delete: {
    Objects: [ { Key: 'Reviews' }, { Key: 'Ratings' } ]
  }}, (err, data) => {
    err ? console.log('Error:', err) : console.log('Data:', data);
  });
};

const uploadToBucket = async (bucket) => {
  await mongoDb.getAllReviews()
    .then( async (reviews) => {
      await s3.upload({ Bucket: bucket, Key: 'Reviews', Body: JSON.stringify(reviews) }, (err, result) => {
        err ? console.log('Error:', err) : console.log('Result:', result);
      });
    });
  await mongoDb.getAllRatings()
    .then( async (ratings) => {
      await s3.upload({ Bucket: bucket, Key: 'Ratings', Body: JSON.stringify(ratings) }, (err, data) => {
        err ? console.log('Error:', err) : console.log('Data:', data);
      });
    });
};

const resetAndPopulateBucket = async (bucket) => {
  await createBucket(bucket);
  await emptyBucket(bucket);
  uploadToBucket(bucket);
};

// === ACTIVATE HERE === (node database/s3.js)
resetAndPopulateBucket(bucketName);
