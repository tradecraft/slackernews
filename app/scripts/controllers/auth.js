'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth, user) {
  if (user) {
    $location.path('/');
  }

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function () {
        $location.path('/');
      })
      .catch(function (error) {
        $scope.error = error.toString();
      });
  };

  $scope.register = function () {
    Auth.register($scope.user)
      .then(function(user) {
        return Auth.login($scope.user)
        .then(function() {
          user.username = $scope.user.username;
          user.email    = $scope.user.email;
          return Auth.createProfile(user);
        })
        .then(function() {
          $location.path('/');
        });
      })
      .catch(function(error) {
        $scope.error = error.toString();
      });
  };
});
