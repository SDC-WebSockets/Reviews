const path = require('path');
const entryPath = path.join(__dirname, '/client/src/index.jsx');
const outputPath = path.join(__dirname, '/client/public');

module.exports = {
  entry: entryPath,
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        }
      }
    ]
  },
  output: {
    filename: 'reviewBundle.js',
    path: outputPath
  },

  watch: true
};