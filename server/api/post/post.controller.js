'use strict';

import Post from './post.model';
import Recipient from './recipient.model';
import Like from './like.model';
/**
 * Get my info
 */
exports.create = function(req, res, next) {
  console.log('inside create');
  console.log('recipients = ' + JSON.stringify(req.body.recipients));
  Post.create({
    content: req.body.content,
    posttype: req.body.posttype,
    createdby: req.body.createdby,
    imageurl: req.body.imageurl,
    parentpostid: req.body.parentpostid
  }, function(error, post) {
    if(!error) {
        console.log('post id = ' + post._id);
        if(req.body.posttype == "Message") {
          var recipients = req.body.recipients;
          for(var i = 0; i < recipients.length; i++) {
            Recipient.create({
              recipientid: recipients[i].id,
              postid: post._id
            }, function(error, recipient) {

            });
          }
        }
        res.status(200).end();
    } else {
        console.log('error = ' + error);
        res.status(500).send(error);
    }
  });
};

exports.like = function(req, res, next) {
  console.log('inside like');
  console.log('like body = ' + JSON.stringify(req.body));
  Like.create({
    userid: req.body.userid,
    postid: req.body.postid
  }, function(error, post) {
    if(!error) {
        console.log('post id = ' + post._id);
        res.status(200).end();
    } else {
        console.log('error = ' + error);
        res.status(500).send(error);
    }
  });
};

exports.unlike = function(req, res, next) {
  console.log('inside unlike');
  console.log('unlike body = ' + JSON.stringify(req.body));
  Like.remove({
    userid: req.body.userid,
    postid: req.body.postid
  }, function(error) {
    if(!error) {
        console.log('removed like');
        res.status(200).end();
    } else {
        console.log('error = ' + error);
        res.status(500).send(error);
    }
  });
};

exports.likes = function(req, res, next) {
  console.log('inside get messages req' + JSON.stringify(req.params));
  Like.find({userid: req.params.id})
  .exec(function(error, likes){
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      console.log('retrieved likes = ' + JSON.stringify(likes));
      res.status(200).json(likes);
    }
  });
};

exports.messages = function(req, res, next) {
  console.log('inside get messages req' + JSON.stringify(req.params));
  Recipient.find({recipientid: req.params.id})
  .sort('-createdby')
  .populate('postid')
  .exec(function(error, recipients){
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      console.log('retrieved recipients = ' + JSON.stringify(recipients));
      res.status(200).json(recipients);
    }
  });
};

exports.comments = function(req, res, next) {
  console.log('inside get comments req' + JSON.stringify(req.params));
  Post.find({parentpostid: req.params.id})
  .sort('-createdby')
  .exec(function(error, comments){
    if(error) {
      console.log('error = ' + error);
      res.status(500).send(error);
    } else {
      console.log('retrieved comments = ' + JSON.stringify(comments));
      res.status(200).json(comments);
    }
  });
};

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
