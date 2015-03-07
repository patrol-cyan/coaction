
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
