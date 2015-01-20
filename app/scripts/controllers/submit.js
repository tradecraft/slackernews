'use strict';

app.controller('SubmitCtrl', function ($scope, $location, Auth, Post) {
  $scope.post = {url: 'http://', title: ''};
  $scope.user = Auth.user;

  $scope.submitPost = function () {
    $scope.post.creator    = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };
});
