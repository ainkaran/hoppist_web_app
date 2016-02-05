/*  this file exists for the sole purpose of assigning an
    environment variable to toggle the API_ENDPOINT
*/

var config = require('./webpack.config.js');
var webpack = require('webpack');

config.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("development")
    }
  })
);

module.exports = config;
