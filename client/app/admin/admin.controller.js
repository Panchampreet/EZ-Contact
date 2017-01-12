'use strict';

angular.module('ezcontactApp')
  .controller('AdminController', function($scope, $http, Auth) {
    $scope.user = {};
    $scope.user.id = Auth.getCurrentUser().id;
    $scope.user.email = Auth.getCurrentUser().email;
    $scope.user.name = Auth.getCurrentUser().name;
    $scope.user.title = Auth.getCurrentUser().title;
    $scope.user.team = Auth.getCurrentUser().team;
    $scope.user.organization = Auth.getCurrentUser().organization;
    $scope.user.role = Auth.getCurrentUser().role;
    $scope.user.imageurl = Auth.getCurrentUser().imageurl;

    $scope.create = function() {
      $http.post('/api/users/create', {
        id: $scope.user.id,
        email: $scope.user.email,
        name: $scope.user.name,
        title: $scope.user.title,
        team: $scope.user.team,
        organization: $scope.user.organization,
        role: $scope.user.role,
        imageurl: $scope.user.imageurl
      }).then(function(response) {
        alert('success');
      });
    };

    $scope.delete = function() {
     $http.post('/api/users/delete', {
        id: $scope.user.id
      }).then(function(response) {
        alert('success');
      });
    };

    $scope.update = function() {
     $http.post('/api/users/update', {
        id: $scope.user.id,
        email: $scope.user.email,
        name: $scope.user.name,
        title: $scope.user.title,
        team: $scope.user.team,
        organization: $scope.user.organization,
        role: $scope.user.role,
        imageurl: $scope.user.imageurl
      }).then(function(response) {
        alert('success');
      });
    };

    $scope.search = function() {
      $http.get('/api/users/search',{params: {
        name: $scope.searchtext
      }}).then(function(response) {
        if(response.data != null){
          $scope.user.id = response.data.id;
          $scope.user.email = response.data.email;
          $scope.user.name = response.data.name;
          $scope.user.title = response.data.title;
          $scope.user.team = response.data.team;
          $scope.user.organization = response.data.organization;
          $scope.user.role = response.data.role;
          $scope.user.imageurl = response.data.imageurl;
        } else {
          alert('no search results for ' + $scope.searchtext);
          $scope.searchtext = "";
        }
      });
    };
});