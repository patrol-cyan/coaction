app.factory('taskService', ['$http', '$log', function($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, task));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));

  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    getTaskList: function () {
      // return get('/api/tasks');
      // will replace w correct api call
      return [{title: 'get groceries'}];
        // title: "pick up apples",
        // description: "pink ladys, honeycrisp",
        // date: "February 27th"
      // }];
    }

  //   getTask: function (id) {
  //     return get('/api/tasks/' + id);
  //   },
  //
  //   addTask: function (task) {
  //     return post('/api/tasks', task);
  //   },
  //
  //   deleteTask: function (id) {
  //     return remove('/api/tasks/' + id);
  //   }
  };
}]);
