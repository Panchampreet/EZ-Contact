'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: String,
  posttype: String,
  parentpostid: String,
  createdby: String,
  imageurl: String,
  createdon: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
