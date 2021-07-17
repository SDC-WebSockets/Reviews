const path = require('path');
const s3 = require('../s3config.js');
const mongoDb = require('../database/mongoDb.js');
const faker = require('faker');
const axios = require('axios');
const AWS = require('aws-sdk');
const stream = require('stream');
const fs = require('fs');

const bucketName = 'rpt27-sdc-websockets';

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

const uploadAvatarsToS3 = async (bucket) => {
  const s3 = new AWS.S3();
  const uploadFromStream = async (readStream, key) => {
    const pass = new stream.PassThrough();
    const params = {
      Bucket: bucket,
      Key: key,
      Body: readStream
    };

    console.log(`== passthrough stream for ${key} ==`);

    return {
      writeStream: pass,
      promise: s3.upload(params).promise()
    };
  };


  for (let i = 0; i < 1000; i++) {
    let avatar = faker.image.avatar();
    const imagePath = path.join(__dirname, `${i}.jpg`);
    axios({
      method: 'get',
      url: avatar,
      responseType: 'stream',
    })
      .then(async (response) => {
        console.log('== got response from faker fetch ==', response.status);
        const { writeStream, promise } = uploadFromStream(response.data, `avatars/avatar${i}.jpg`);
        return promise;
      })
      .catch((err) => {
        console.error(`Failed to fetch image from ${avatar}`);
      });
  }
};
// === ACTIVATE HERE === (node database/s3.js)
// resetAndPopulateBucket(bucketName);
uploadAvatarsToS3(bucketName);
