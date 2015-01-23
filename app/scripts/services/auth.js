'use strict';

app.factory('Auth', function ($firebaseAuth, FIREBASE_URL, $firebase, $rootScope, $location) {
  var ref  = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  $rootScope.authObj = auth;

  var Auth = {
    register: function (user) {
      $rootScope.authObj.$createUser(user)
        .then(function(userData) {
        console.log("User " + userData.uid + " created successfully!");
        Auth.createProfile(user);
        console.log("User " + user.username + " profile created successfully!");
        return $rootScope.authObj.$authWithPassword(user);
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Error: ", error);
      });
    },

    createProfile: function (user) {
      var profile = {
        username : user.username,
        email    : user.email
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, user);
    },

    login: function (user) {
      $rootScope.authObj.$authWithPassword(user).then(function(authData) {
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    },

    guestLogin: function () {
      $rootScope.authObj.$authAnonymously().then(function(authData) {
        console.log("Logged in as:", authData.uid);
        Auth.createProfile({
          username : "Guest",
          email    : "guest@sn.com"
        });
        console.log("Guest profile sucessfully created!");
        $location.path("/");
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    },

    logout: function () {
      auth.$unauth();
    },

    resolveUser: function () {
      return auth.$waitForAuth();
    },

    signedIn: function () {
      return !!auth.$getAuth();
    },

    getActiveUser: function () {
      return auth.$getAuth();
    }
  };

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
    } else {
      console.log("Logged out");
      $location.path("/");
    }
  });

  return Auth;
});
