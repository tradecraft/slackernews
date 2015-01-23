'use strict';

app.controller('AuthCtrl', function ($scope, $firebase, $location, Auth, user) {
  if (user) $location.path('/');

  $scope.login = function (user) {
    Auth.login(user);
  };

  $scope.guestLogin = function () {
    return Auth.guestLogin();
  };

  $scope.register = function (user) {
    Auth.register(user);
  };
});
