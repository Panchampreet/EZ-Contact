'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
  userid: String,
  postid: String,
  createdon: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Like', LikeSchema);
