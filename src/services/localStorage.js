angular.module('footApp').factory('localService', [
  '$window',
  function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value
      },
      remove: function(key) {
        $window.localStorage.removeItem(key)
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue
      },
      setObject: function(key, value) {
        if (localStorage.getItem(key) === null) {
          $window.localStorage[key] = JSON.stringify(value)
        } else {
          alert("Already favorited!");
        }
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}')
      },
      getAll: function allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
          var item = JSON.parse(localStorage.getItem(JSON.parse(keys[i])));
          values.push(item);
        }
        return values;
      },
      clearAll: function() {
        $window.localStorage.clear()
      }
    }
  }
])
