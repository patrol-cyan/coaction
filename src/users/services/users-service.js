app.factory('usersService', ['$http', '$q', '$log', 'ajaxHelper', function($http, $q, $log, ajaxHelper) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, task));
  }

  function put(url, task) {
    return processAjaxPromise($http.put(url, task));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      if (error.status === 401) {
        // We're not logged in..!!!
        $location.path('/login');
      }
      $log.log(error);
    });
  }

  return {
    // list: function () {
    //   return ajaxHelper.call($http.get('/api/users'));
    // },

    // getByUserId: function (userId) {
    //   if (!userId) {
    //     throw new Error('getByUserId requires a user id');
    //   }
    //
    //   return ajaxHelper.call($http.get('/api/users/' + userId));
    // },

    addUser: function (user) {
      return post($http.post('/api/users', user));
    },

    getCurrentUser: function() {
      return get($http.get('/api/users/current'));
    },

    logIn: function (user) {
      return post($http.post('/api/login', user));
    },

    logIn: function (user) {
      return post($http.post('/api/logout', user));
    }

  };
}]);
