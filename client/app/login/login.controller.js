'use strict';

angular.module('ezcontactApp')
  .controller('LoginController', function($state, Auth) {
  		Auth.isLoggedIn(function(loggedIn) {
	          if (loggedIn) {
	            $state.go('home');
	          }
	});
});