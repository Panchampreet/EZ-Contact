'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RecipientSchema = new Schema({
  recipientid: String,
  postid: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  createdon: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Recipient', RecipientSchema);
