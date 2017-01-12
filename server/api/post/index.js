'use strict';

import express from 'express';
import controller from './post.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.post('/create', controller.create);
router.get('/messages/:id', controller.messages);
router.get('/comments/:id', controller.comments);
router.post('/like', controller.like);
router.post('/unlike', controller.unlike);
router.get('/likes/:id', controller.likes);

module.exports = router;
