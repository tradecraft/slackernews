'use strict';

app.controller('NavCtrl', function ($scope, Auth, User) {
  $scope.user     = Auth.getActiveUser();
  $scope.profile  = User.get($scope.user.uid);
  $scope.signedIn = Auth.signedIn;
  $scope.logout   = Auth.logout;

  $scope.logout = function () {
    Auth.logout();
  };

});
