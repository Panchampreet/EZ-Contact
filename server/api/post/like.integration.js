var unirest = require('unirest');
var expect = require('chai').expect;

describe('Testing creating a new comment', function(){
  var request = unirest.post('http://localhost:9000/api/users/create');
  it('create new comment', function() {
    request.send({content:'testcomment', posttype: 'comment', createdby: 'test@example.com'});
    request.end(function(response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing liking a comment', function(){
  var request = unirest.post('http://localhost:9000/api/users/like');
  it('liking a comment', function() {
    request.send({userid: 'test@example.com', postid: '123'});
    request.end(function(response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing unliking a comment', function(){
  var request = unirest.post('http://localhost:9000/api/users/unlike');
  it('unliking a comment', function() {
    request.send({userid: 'test@example.com', postid: '123'});
    request.end(function(response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing liked method', function(){
  var request = unirest.post('http://localhost:9000/api/users/liked');
  it('create new comment', function() {
    request.send({userid: 'test@example.com', postid: '123'});
    request.end(function(response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});