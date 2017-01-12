'use strict';

angular.module('ezcontactApp')
  .controller('CreateMessageController', function($scope, $http, Auth) {
    $scope.recipients = [];
    $scope.user = Auth.getCurrentUser();

    $http.get('/api/users/all/' + $scope.user._id).then(function(response) {
      $scope.users = response.data;
    });

    $scope.createMessage = function() {
      var recipients = $scope.recipients;
      recipients.push(Auth.getCurrentUser());
      $http.post('/api/posts/create', {content: $scope.message,
        posttype: 'Message',
        createdby: Auth.getCurrentUser().id,
        imageurl: Auth.getCurrentUser().imageurl,
        recipients: recipients
      });
      $scope.message = "";
    };

});