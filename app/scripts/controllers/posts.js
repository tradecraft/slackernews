'use strict';

app.controller('PostsCtrl', function ($scope, $location, $firebase, FIREBASE_URL, Auth, Post) {
  var ref   = new Firebase(FIREBASE_URL);

  $scope.posts = Post.all;
  $scope.user  = Auth.user;
  $scope.post  = {url: 'http://', title: ''};

  $scope.deletePost = function (post) {
    Post.delete(post);
  };

});
