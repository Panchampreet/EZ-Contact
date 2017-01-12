'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  name: String,
  imageurl: {
    type: String, 
    default: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50'
  },
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: 'user'
  },
  title: {
    type: String,
    default: 'Software Engineer'
  },
  team: {
    type: String,
    default: 'Apple'
  },
  organization: {
    type: String,
    default: 'Customer Service'
  }
});

module.exports = mongoose.model('User', UserSchema);
