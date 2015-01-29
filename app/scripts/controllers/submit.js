'use strict';

app.controller('SubmitCtrl', function ($scope, $location, Auth, Post, User) {
  $scope.post = {url: 'http://', title: ''};
  $scope.user = Auth.getActiveUser();

  if ($scope.user) {
    $scope.profile = User.get($scope.user.uid);
  }

  $scope.submitPost = function () {
    $scope.post.creator    = $scope.profile.username;
    $scope.post.creatorUID = $scope.user.uid;
    $scope.post.score      = 1;
    $scope.post.createdAt  = Math.round(new Date().getTime()/1000.0);

    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };
});
