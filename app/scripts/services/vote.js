'use strict';

app.factory('Vote', function ($firebase, FIREBASE_URL, $rootScope) {
  var ref   = new Firebase(FIREBASE_URL);
  var votes = $firebase(ref.child('votes')).$asArray();

  var Vote = {
    all: votes,

    create: function (post) {
      if ($rootScope.CUid) {
        var vote = { postId : post.$id };
        var CUvotes = $firebase(ref.child('votes').child($rootScope.CUid));
        CUvotes.$set(post.$id, vote);
      }
    },

    get: function (post) {
      if ($rootScope.CUid) {
        return $firebase(ref.child('votes').child($rootScope.CUid).child(post.$id)).$asObject();
      }
    },

    exists: function (post) {
      if ($rootScope.CUid) {
        var CUvotes = $firebase(ref.child('votes').child($rootScope.CUid)).$asArray();
        if (CUvotes.$indexFor(post.$id) != -1) return true;
      }

      return false;
    }
  };

  return Vote;
});
