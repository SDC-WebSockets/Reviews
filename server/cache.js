const cache = require('express-redis-cache');
const client1 = cache({host: process.env.REDISCACHE1});
const client2 = cache({host: process.env.REDISCACHE2});
const client3 = cache({host: process.env.REDISCACHE3});
// const client4 = cache({host: process.env.REDISCACHE4});

const cacheData = (courseId, data) => {
  if (courseId >= 9000000 && courseId < 9150000) {
    client1.add(`ser:${courseId}`, JSON.stringify(data), { expire: 60 * 60 * 24, type: 'json' }, (err, added) => {});
  } else if (courseId >= 9150000 && courseId < 9300000) {
    client2.add(`ser:${courseId}`, JSON.stringify(data), { expire: 60 * 60 * 24, type: 'json' }, (err, added) => {});
  } else if (courseId >= 9300000 && courseId < 9400000) {
    client3.add(`ser:${courseId}`, JSON.stringify(data), { expire: 60 * 60 * 24, type: 'json' }, (err, added) => {});
  } /*else if (courseId >= 9300000 && courseId < 9400000) {
    client4.add(`ser:${courseId}`, JSON.stringify(data), { expire: 60 * 60 * 24, type: 'json' }, (err, added) => {});
  }*/
};

const getCacheData = (courseId) => {
  return new Promise((resolve, reject) => {
    if (courseId >= 9000000 && courseId < 9150000) {
      client1.get(`ser:${courseId}`, (err, results) => {
        if (results.length > 0) {
          resolve(results[0].body);
        } else {
          resolve(null);
        }
      });
    } else if (courseId >= 9150000 && courseId < 9300000) {
      client2.get(`ser:${courseId}`, (err, results) => {
        if (results.length > 0) {
          resolve(results[0].body);
        } else {
          resolve(null);
        }
      });
    } else if (courseId >= 9300000 && courseId < 9400000) {
      client3.get(`ser:${courseId}`, (err, results) => {
        if (results.length > 0) {
          resolve(results[0].body);
        } else {
          resolve(null);
        }
      });
    } /*else if (courseId >= 9300000 && courseId < 9400000) {
      client4.get(`ser:${courseId}`, (err, results) => {
        if (results.length > 0) {
          resolve(results[0].body);
        } else {
          resolve(null);
        }
      });
    } */else {
      resolve(null);
    }
  })
};

module.exports.cacheData = cacheData;
module.exports.getCacheData = getCacheData;