'use strict';

angular.module('ezcontactApp')
  .controller('ContactController', function($scope, $http, Auth) {
    $scope.searchtext = "";
    $scope.user = Auth.getCurrentUser();
    $scope.search = function() {
      $http.get('/api/users/search',{params: {
        name: $scope.searchtext
      }}).then(function(response) {
        if(response.data != null){
          $scope.user = response.data;
        } else {
          alert('no search results for ' + $scope.searchtext);
          $scope.searchtext = "";
        }
      });
    };
});