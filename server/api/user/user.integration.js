var unirest = require('unirest');
var expect = require('chai').expect;

describe('Ping Test', function() {
  var request = unirest.get('http://localhost:9000/api/users');
  it('ping test success', function() {
    request.end(function (response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing creating a new user', function() {
  var request = unirest.post('http://localhost:9000/api/users/create');
  it('create valid user', function() {
    request.send({name: 'test',
      email: 'test@example.com',
      role: 'user'});
    request.end(function (response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing deleting a new user', function(){
  var request = unirest.post('http://localhost:9000/api/users/delete');
  it('delete a valid user', function() {
    request.send({email: 'test@example.com'});
    request.end(function (response) {
      expect(response.statusCode).to.equal(200);
    });
  });
});

describe('Testing invalid deleting a new user', function(){
  var request = unirest.post('http://localhost:9000/api/users/delete');
  it('delete an invalid user', function() {
    request.send({email: 'test@example.com'});
    request.end(function (response) {
      expect(response.statusCode).to.equal(500);
    });
  });
});

describe('Testing updation of user details',function(){
  var request = unirest.post('http://localhost:9000/api/users/update');
  it('update a valid user', function(){
     request.send({email: 'test@example.com'});
     request.end(function (response) {
      expect(response.statusCode).to.equal(200);
     });
  });
});

describe('Testing searching a user', function(){
  var request = unirest.post('http://localhost:9000/api/users/update');
  it('searching a valid user', function(){
     request.send({name: 'test'});
     request.end(function (response){
       expect(response.statusCode).to.equal(200);
     });
  });
});

describe('Testing viewing a user', function(){
  var request = unirest.post('http://localhost:9000/api/users/view');
  it('viewing a valid user', function(){
     request.send({email: 'test@example.com'});
     request.end(function (response){
       expect(response.statusCode).to.equal(200);
     });
  });
});