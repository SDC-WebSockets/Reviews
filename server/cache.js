const Memcached = require('memcached');
const dotenv = require('dotenv');
dotenv.config();
const memcached = new Memcached(`${process.env.MEMCACHED}:11211`);

const cacheContent = (req, res, next) => {
  const key = `${req.method}${req.originalUrl}`;
  memcached.get(key, (err, data) => {
    if (err) {
      console.error(err);
      next();
    } else if (data !== null) {
      res.send(data);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memcached.add(key, body, 86400);
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = cacheContent;
