'use strict';

app.controller('UserCtrl', function ($scope, $routeParams, User) {
  var uid = $routeParams.userId;

  $scope.profile = User.get(uid);

  User.getPosts(uid).then(function (posts) {
    $scope.posts = posts;
  });
});
