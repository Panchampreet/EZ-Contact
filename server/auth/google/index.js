'use strict';

import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/',
    scope: [
      'profile',
      'email'
    ],
    prompt: 'consent',
    session: false
  }))

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
