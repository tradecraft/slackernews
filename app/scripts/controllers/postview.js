'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, Post, Auth, User) {
  $scope.post     = Post.get($routeParams.postId);
  $scope.comments = Post.comments($routeParams.postId);
  $scope.user     = Auth.getActiveUser();
  $scope.signedIn = Auth.signedIn;

  if ($scope.user) {
    $scope.profile = User.get($scope.user.uid);
  }

  $scope.addComment = function () {
    if (!$scope.commentText || $scope.commentText === '') return;

    var comment = {
      text       : $scope.commentText,
      creator    : $scope.profile.username,
      creatorUID : $scope.user.uid,
      createdAt  : Math.round(new Date().getTime()/1000.0)
    };

    $scope.comments.$add(comment);
    $scope.commentText = '';
  };

  $scope.deleteComment = function (comment) {
    $scope.comments.$remove(comment);
  };
});
