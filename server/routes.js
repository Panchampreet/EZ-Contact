/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  app.use('/api/users', require('./api/user'));
  app.use('/api/posts', require('./api/post'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      console.log('inside /* route');
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
