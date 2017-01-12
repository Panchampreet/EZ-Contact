'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/ping', controller.ping);
router.get('/me', controller.me);
router.get('/all/:id', controller.all);
router.get('/search', controller.search);
router.post('/create', controller.create);
router.post('/delete', controller.delete);
router.post('/update', controller.update);
router.post('/view', controller.view);

module.exports = router;
