const path = require('path');
const entryPath = path.join(__dirname, '/client/src/index.jsx');
const outputPath = path.join(__dirname, '/client/public');
const Dotenv = require('dotenv-webpack');
const S3Plugin = require('webpack-s3-plugin');

module.exports = {
  entry: entryPath,
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new Dotenv()
    // ,
    // new S3Plugin({
    //   exclude: /.*\.html$/,
    //   s3Options: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     region: 'us-west-1'
    //   },
    //   s3UploadOptions: {
    //     Bucket: 'review-bundle-bucket'
    //   }
    // })
  ],
  output: {
    path: outputPath,
    filename: 'reviewBundle.js'
  },
  devtool: 'eval-cheap-source-map'
};