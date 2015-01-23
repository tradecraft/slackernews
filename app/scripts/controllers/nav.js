'use strict';

app.controller('NavCtrl', function ($scope, Auth, Profile) {
  $scope.user     = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.logout   = Auth.logout;

  if ($scope.user) {
    $scope.username = Profile.get($scope.user.uid).username;
  }

  $scope.logout = function () {
    Auth.logout();
  };

  $scope.profile = function () {
    if ($scope.user) {
      return Profile.get($scope.user.uid);
    } else {
      return null;
    }
  }
});
