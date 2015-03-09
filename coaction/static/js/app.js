// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);

app.controller('MainNavCtrl',
  ['$location', 'StringUtil', function($location, StringUtil) {
    var self = this;

    self.isActive = function (path) {
      // The default route is a special case.
      if (path === '/') {
        return $location.path() === '/';
      }

      return StringUtil.startsWith($location.path(), path);
    };
  }]);
  

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/register/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'vm'
    // resolve: {
    //   users: ['usersService', function (usersService) {
    //     return usersService.list();
    //   }]
    // }
  };

  $routeProvider.when('/register', routeDefinition);
}])
.controller('RegisterCtrl', ['$location', 'usersService', 'User', function ($location, usersService, User) {
  var self = this;

  self.message = null;

  self.newUser = User();
  console.log(self.newUser);

  self.addUser = function () {
    usersService.addUser(self.newUser).then(function (data) {
      console.log(data)
      if (typeof data.message === 'undefined') {
        self.goToTasks();
      } else {
        self.message = data.message;
      }
    });
  };

  self.goToTasks = function () {
    console.log('goToTasks')
    // $location.path('/tasks');
  };

}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: '/static/tasks/new-task.html',
    controller: 'EditTaskCtrl',
    controllerAs: 'vm',
    resolve: {
      task: ['tasksService', '$route', function (tasksService, $route) {
        return tasksService.getTask($route.current.params.taskId);
      }],
    }
  };

  $routeProvider.when('/tasks/:taskId/edit', routeDefinition)
}])
.controller('EditTaskCtrl', ['tasksService', 'task', '$location', function (tasksService, task, $location) {
  var self = this;

  self.title = 'Edit Task';//in order to change html elements for edit view

  self.saveText = 'Save Task';

  self.task = task;

  self.saveTask = function () {
    tasksService.updateTask(self.task).then(self.goToTasks);
  };

  self.deleteTask = function () {
    tasksService.deleteTask(self.task).then(self.goToTasks);
  };

  self.goToTasks = function () {
    $location.path('/tasks');
  };

  self.cancelTaskEdit = function () {
    self.goToTasks();
  };

}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: '/static/tasks/new-task.html',
    controller: 'NewTaskCtrl',
    controllerAs: 'vm',
  };

  $routeProvider.when('/tasks/new', routeDefinition)
}])
.controller('NewTaskCtrl', ['tasksService', 'Task', '$location', function (tasksService, Task, $location) {
  var self = this;

  self.title = 'New Task';//in order to change html elements for edit view

  self.saveText = 'Create Task';

  self.task = Task();

  self.saveTask = function () {
    tasksService.addTask(self.task).then(self.goToTasks);
  };

  self.goToTasks = function () {
    $location.path('/tasks');
  };

  self.cancelTaskEdit = function () {
    self.goToTasks();
  };

}]);

app.factory('Task', [ function() {

  return function(spec) {
    spec = spec || {};

    var self = {
      assignee: spec.assignee || null,
      completion_status: spec.completionStatus,
      description: spec.description,
      due_date: spec.dueDate || null,
      id: spec.taskId,
      owner: spec.userId,
      started_status: spec.startedStatus,
      status: spec.status || "TODO",
      title: spec.title || null,
      // comments: spec.comments || []
      //not sure if this will work with how
      //they're setting up the comment class

    };

    return self;
  };
}]);

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: '/static/tasks/tasks.html',
    controller: 'TasksCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['tasksService', function (tasksService) {
        return tasksService.list();
      }],
    }
  };

  $routeProvider.when('/', routeDefinition)
    .when('/tasks', routeDefinition);
}])
.controller('TasksCtrl', ['$location', 'tasks', 'usersService', function ($location, tasks, usersService) {
  var self = this;

  self.tasks = tasks;

  usersService.getCurrentUser().then(function (user) {
    if (typeof user.email === 'undefined') {
      $location.path('/register');
    }
  })
}]);

app.factory('User', function () {
  return function (spec) {
    spec = spec || {};
    return {
      name: spec.name,
      email: spec.email,
      password: spec.password,
      password_verification: spec.password_verification
    };
  };
});

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/user.html',
    controller: 'UsersCtrl',
    controllerAs: 'vm',
    resolve: {
      users: ['usersService', function (usersService) {
        return usersService.list();
      }]
    }
  };

  $routeProvider.when('/users', routeDefinition);
}])
.controller('UsersCtrl', ['users', 'usersService', 'User', function (users, usersService, User) {
  var self = this;

  self.users = users;

  self.newUser = User();

  self.addUser = function () {
    // Make a copy of the 'newUser' object
    var user = User(self.newUser);

    // Add the user to our service
    usersService.addUser(user).then(function () {
      // If the add succeeded, remove the user from the users array
      self.users = self.users.filter(function (existingUser) {
        return existingUser.userId !== user.userId;
      });

      // Add the user to the users array
      self.users.push(user);
    });

    // Clear our newUser property
    self.newUser = User();
  };
}]);


// app.config(['$routeProvider', function($routeProvider) {
//   var routeDefinition = {
//     templateUrl: 'users/user.html',
//     controller: 'UserCtrl',
//     controllerAs: 'vm',
//     resolve: {
//       user: ['$route', 'usersService', function ($route, usersService) {
//         var routeParams = $route.current.params;
//         return usersService.getByUserId(routeParams.userid);
//       }],
//       github: ['$route', '$http', function ($route, $http) {
//         var routeParams = $route.current.params;
//         return $http.get('https://api.github.com/users/' + routeParams.userid);
//       }]
//     }
//   };
//
//   $routeProvider.when('/users/:userid', routeDefinition);
// }])
// .controller('UserCtrl', ['user', 'github', function (user, github) {
//   this.user = user;
//   this.github = github.data;
//   console.log(this.github);
// }]);

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

app.factory('tasksService', ['$http', '$log', '$location', function($http, $log, $location) {

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
      return get('/api/tasks/' + id);
    },

    deleteTask: function (task) {
      return remove('/api/tasks/' + task.id, task);
    }
  };

  return self;
}]);

app.factory('currentUser', ['$http', function($http) {

  var current = {
    user: undefined,
    github: undefined
  };

  $http.get('/api/users/me').then(function(result) {
    current.user = result.data;
    $http.get('https://api.github.com/users/' + current.user.userId ).then(function(result) {
      current.github = result.data;
    });
  }).catch(function(err) {
    current.user = undefined;
  });

  return current;
}]);

app.factory('usersService', ['$http', '$log', '$location', function($http, $log, $location) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, user));
  }

  function put(url, task) {
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

//# sourceMappingURL=app.js.map