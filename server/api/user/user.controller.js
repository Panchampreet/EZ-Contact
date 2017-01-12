'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

exports.ping = function(req, res, next) {
  res.status(200).end();
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -hashedPassword')
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      console.log('user = ' + JSON.stringify(user));
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

exports.create = function(req, res, next) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }, function(error, user) {
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      res.status(200).json(user);
    }
  });
};

exports.delete=function(req,res,next){
  User.remove({
      email: req.body.email
  }, function(error) {
    if(!error) {
        console.log('removed like');
        res.status(200).end();
    } else {
        console.log('error = ' + error);
        res.status(500).send(error);
    }
  })
};

exports.update=function(req,res,next){
  User.findOne({'email': req.body.email},
    function (err, user) {
      if(err){ console.log( err);
        console.log('error = ' + error);
        res.status(500).send(error);
      } else {
        user.id = req.body.id;
        user.team = req.body.team;
        user.email = req.body.email;
        user.title = req.body.title;
        user.organization = req.body.organization;
        user.name = req.body.name;
        user.role = req.body.role;
        user.imageurl = req.body.imageurl;
        user.save( function (error) {
          if(!error) {
              console.log('user saved');
              res.status(200).end();
          } else {
              console.log('error = ' + error);
              res.status(500).send(error);
          }
        });
      }
    })
};


exports.view=function(req, res, next){
  User.findOne({'email': req.body.email})
  .exec(function (error, user) {
    if(error){
      console.log('error =' + error);
      res.status(500).send(error);      
    } else{
      res.status(200).json(user)
    }
  });
};

exports.all = function(req, res, next) {
  console.log('_id = ' + req.params.id);
  User.find({'_id': {$ne: req.params.id}})
  .exec(function(error, users){
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      res.status(200).json(users)
    }
  });
};



exports.search = function(req, res, next) {
  console.log('query = ' + JSON.stringify(req.query));
  User.findOne({'name': req.query.name})
  .exec(function(error, user){
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      res.status(200).json(user)
    }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
