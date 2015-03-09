app.factory('usersService', ['$http', '$log', '$location', function($http, $log, $location) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, user) {
    return processAjaxPromise($http.post(url, user));
  }

  function put(url, user) {
    return processAjaxPromise($http.put(url, user));
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
      return post('/api/register', user);
    },

    getCurrentUser: function() {
      return get('/api/users/current');
    },

    logIn: function (user) {
      return post('/api/login', user);
    },

    logOut: function (user) {
      return post('/api/logout', user);
    }

  };
}]);
