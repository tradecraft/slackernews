'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth, User) {
  $scope.user = Auth.getActiveUser();

  if ($scope.user) {
    $scope.profile = User.get($scope.user.uid);
  }

  // Update nav bar current tab
  $scope.$on('$locationChangeStart', function () {
    if ($location.path() == '/') {
      $('a.nav').removeClass('active');
      $('a.nav.popular').addClass('active');
    }
    if ($location.path() == '/newest') {
      $('a.nav').removeClass('active');
      $('a.nav.newest').addClass('active');
    }
    if ($location.path() == '/comments') {
      $('a.nav').removeClass('active');
      $('a.nav.comments').addClass('active');
    }
    if ($location.path() == '/submit') {
      $('a.nav').removeClass('active');
      $('a.nav.submit').addClass('active');
    }
    if ($location.path() == '/login') {
      $('a.nav').removeClass('active');
      $('a.nav.login').addClass('active');
    }
    if ($location.path() == '/register') {
      $('a.nav').removeClass('active');
      $('a.nav.register').addClass('active');
    }
  })

  $scope.logout = function () {
    Auth.logout();
  };

  $scope.signedIn = function () {
    return Auth.signedIn();
  };

});
