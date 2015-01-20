'use strict';

app.factory('Auth', function ($firebaseAuth, FIREBASE_URL, $firebase, $rootScope) {
  var ref  = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user);
    },

    createProfile: function (user) {
      var profile = {
        username : user.username,
        email    : user.email
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
    },

    login: function (user) {
      return auth.$authWithPassword(user);
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

    user: auth.$getAuth()
  };

  auth.$onAuth(function (authData) {
    if (authData) {
      console.log('Logged in as:', authData.uid);
      console.log(authData);
      Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
      console.log(Auth.user.profile);
    } else {
      console.log('Logged out');
      if (Auth.user && Auth.user.profile) {Auth.user.profile.$destroy();}
    }
  });

  return Auth;
});
