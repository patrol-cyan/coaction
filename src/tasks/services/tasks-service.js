app.factory('tasksService', ['$http', '$log', function($http, $log) {
<<<<<<< HEAD
  return {
=======

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
      $log.log(error);
    });
  }


  var self = {
>>>>>>> 3857f0ff7aed96d3793c909ed66de8ffcc14bcb6
    list: function () {
      return get('/api/tasks').then(function (data) {
        return data.tasks;
      });
    },

    addTask: function (task) {
      return post('/api/tasks', task);
    },

    updateTask: function (task) {
      return put('/api/tasks/' + task.id + '/', task);
    },

    getTask: function (id) {
      id = Number(id);
      return self.list().then(function (tasks) {
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id === id) {
            return tasks[i];
          }
        }
      });
      //will remove what's above this when they fix api
      // return get('/api/tasks/' + id);
    },

    deleteTask: function (id) {
      return remove('/api/tasks/' + id);
    }
  };

  return self;
}]);
