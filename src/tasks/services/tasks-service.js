app.factory('tasksService', ['$http', '$log', '$location', function($http, $log, $location) {

  function get(url) {
      return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    var p = $http.post(url, task);
    return processAjaxPromise();
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


  var self = {
    list: function () {
      return get('/api/tasks').then(function (data) {
        return data.tasks;
      });
    },

    addTask: function (task) {
      return post('/api/tasks', task);
    },

    updateTask: function (task) {
      return put('/api/tasks/' + task.id, task);
    },

    getTask: function (id) {
      // id = Number(id);
      // return self.list().then(function (tasks) {
      //   for (var i = 0; i < tasks.length; i++) {
      //     if (tasks[i].id === id) {
      //       return tasks[i];
      //     }
      //   }
      // });
      //will remove what's above this when they fix api
      return get('/api/tasks/' + id);
    },

    deleteTask: function (task) {
      return remove('/api/tasks/' + task.id, task);
    }
  };

  return self;
}]);
