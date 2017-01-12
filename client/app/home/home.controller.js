'use strict';

angular.module('ezcontactApp')
	.controller('HomeController', 
		function($state, Auth) {
			Auth.isLoggedIn(function(loggedIn) {
	          if (!loggedIn) {
	            $state.go('login');
	          }
	        });
  });