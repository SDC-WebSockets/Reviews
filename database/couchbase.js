const couchbase = require('couchbase');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const buildCouchbase = async () => {

  const cluster = await couchbase.connect('couchbase://localhost', {
    username: process.env.COUCH_USER,
    password: process.env.COUCH_PASS
  });

  const bucketMgr = cluster.buckets();

  await bucketMgr.createBucket({
    name: 'rpt27-sdc-websockets-reviews',
    ramQuotaMB: 512,
    flushEnabled: true,
    replicaIndex: false,
    bucketType: couchbase.BucketType.Couchbase
  }, (err) => {
    console.error('Failed to create review bucket: ', err);
  });

  await bucketMgr.createBucket({
    name: 'rpt27-sdc-websockets-reviewers',
    ramQuotaMB: 512,
    flushEnabled: true,
    replicaIndex: false,
    bucketType: couchbase.BucketType.Couchbase
  }, (err) => {
    console.error('Failed to create reviewer bucket: ', err);
  });
};

const flushCouchbase = async (bucketName) => {
  const cluster = await couchbase.connect('couchbase://localhost', {
    username: process.env.COUCH_USER,
    password: process.env.COUCH_PASS
  });

  const bucketMgr = cluster.buckets();

  await bucketMgr.flushBucket(bucketName, (err) => {
    console.error(`failed to flush bucket ${bucketName}`, err);
  });
};

// buildCouchbase();
// flushCouchbase('rpt27-sdc-websockets-reviews');
// flushCouchbase('rpt27-sdc-websockets-reviewers');
