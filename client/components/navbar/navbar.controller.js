'use strict';

angular.module('ezcontactApp')
  .controller('NavbarCtrl', function ($scope, Auth, $window) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
