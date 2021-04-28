const express = require('express');
const path = require('path');
const mongoDb = require('../database/mongoDb.js');
const dataGenerators = require('../database/dataGenerators.js');
const app = express();
const port = 2712;

app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});