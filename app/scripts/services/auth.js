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

      var profileRef = $firebase(ref.child('users'));
      return profileRef.$set(user.uid, profile);
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
          uid      : authData.uid,
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
      var authData = $rootScope.authObj.$getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },

    getActiveUser: function () {
      var authData = $rootScope.authObj.$getAuth();

      if (authData) {
        return authData;
      } else {
        return;
      }
    }
  };

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
      $rootScope.CUid = authData.uid;
    } else {
      console.log("Logged out");
      $rootScope.CUid = null;
      $location.path("/");
    }
  });

  return Auth;
});
