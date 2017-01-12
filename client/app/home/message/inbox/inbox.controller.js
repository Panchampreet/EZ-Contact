'use strict';

angular.module('ezcontactApp')
  .controller('InboxController', function ($scope, $http, Auth) {
    $scope.user = Auth.getCurrentUser();

    $http.get('/api/posts/likes/' + $scope.user.id).then(
      function(response) {
        var likes = {};
        for(var i = 0; i < response.data.length; i++) {
          likes[response.data[i].postid] = true;
        }
        $scope.likes = likes;
    });

    $http.get('/api/posts/messages/' + $scope.user.id).then(
      function(response) {
        $scope.recipients = response.data;
    });

    $scope.isMessageSelected = function() {
      if(typeof $scope.selected !== "undefined" 
        && $scope.selected !== null) {
        return true
      } else {
        return false;
      }
    };

    $scope.closeMessage = function() {
      $scope.selected = null;
    }

    $scope.addComment = function() {
      $http.post('/api/posts/create', {
        content: $scope.comment,
        posttype: 'Comment',
        createdby: Auth.getCurrentUser().id,
        imageurl: Auth.getCurrentUser().imageurl,
        parentpostid: $scope.selected.postid._id
      });
      $scope.comment = "";
      $http.get('/api/posts/comments/' + $scope.selected.postid._id).then(
        function(response) {
          $scope.comments = response.data;
      });
    }

    $scope.readMessage = function(index) {
      $scope.selected = $scope.recipients[index];
      $http.get('/api/posts/comments/' + $scope.selected.postid._id).then(
        function(response) {
          $scope.comments = response.data;
      });
    };

    $scope.liked = function(comment) {
      if(comment != null && comment._id != null)
        return $scope.likes[comment._id];
      return false;
    }

    $scope.like = function(comment) {
      $scope.likes[comment._id] = true;
      $http.post('/api/posts/like', {
        userid: Auth.getCurrentUser().id,
        postid: comment._id
      });
    }

    $scope.unlike = function(comment) {
      $scope.likes[comment._id] = false;
      $http.post('/api/posts/unlike', {
        userid: Auth.getCurrentUser().id,
        postid: comment._id
      });
    }
  });