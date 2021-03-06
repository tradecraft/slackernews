'use strict';

app.controller('PostsCtrl', function ($scope, $location, $firebase, FIREBASE_URL, Auth, Post, Vote) {
  var ref   = new Firebase(FIREBASE_URL);

  $scope.posts = Post.all;
  $scope.votes = Vote.all;
  $scope.user  = Auth.getActiveUser();
  $scope.post  = {url: 'http://', title: ''};

  $scope.deletePost = function (post) {
    Post.delete(post);
  };

  $scope.upVote = function (post) {
    if ($scope.user) {
      Vote.create(post);
      $('a.' + post.$id).hide();
    }
  };

  $scope.voted = function (post) {
    return Vote.exists(post);
  };

  $scope.query = function () {
    return $('footer.input').val();
  };

});
