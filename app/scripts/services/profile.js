'use strict';

app.factory('Profile', function ($scope, FIREBASE_URL, $firebase, Post, $q) {
  var ref = new Firebase(FIREBASE_URL + "profile");
  $scope.profiles = $firebase(ref);

  var profile = {
    get: function (userId) {
      return $firebase(ref.child(userId)).$asObject();
    },

    create: function (user) {
      var profile = {
        username : user.username,
        email    : user.email
      };

      $scope.profiles.$set(user.uid, profile);
    },

    getPosts: function (userId) {
      var defer = $q.defer();

      $firebase(ref.child('user_posts').child(userId))
        .$asArray()
        .$loaded()
        .then(function (data) {
          var posts = {};

          for (var i = 0; i < data.length; i++) {
            var value    = data[i].$value;
            posts[value] = Post.get(value);
          }

          defer.resolve(posts);
        });

      return defer.promise;
    }
  };

  return profile;
});
