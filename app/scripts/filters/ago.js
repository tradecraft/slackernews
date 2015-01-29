'use strict';

app.filter('ago', function() {
  return function (input) {
    var m = moment.unix(input);

    if (m.isValid()){
      return m.fromNow();
    } else {
      return input;
    }
  };
})
