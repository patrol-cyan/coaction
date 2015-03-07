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
    // resolve: {
    //   tasks: ['tasksService', function (tasksService) {
    //     return tasksService.addTask();
    //   }],
    // }
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
      assignee: spec.assignee,
      completion_status: spec.completionStatus,
      due_date: spec.dueDate,
      id: spec.taskId,
      owner: spec.userId,
      started_status: spec.startedStatus || 'new',
      title: spec.title,
      description: spec.description,
      comments: spec.comments || []
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
.controller('TasksCtrl', ['tasks', function (tasks) {
  var self = this;

  self.tasks = tasks;
}]);


// app.config(['$routeProvider', function($routeProvider) {
//   var routeDefinition = {
//     templateUrl: 'shares/shares.html',
//     controller: 'SharesCtrl',
//     controllerAs: 'vm',
//     resolve: {
//       shares: ['shareService', function (shareService) {
//         return shareService.getShareList();
//       }]
//     //   upvotes: ['voteService', function (voteService) {
//     //     return VoteService.upvote();
//     //   }],
//     //   downvotes: ['voteService', function (voteService) {
//     //     return VoteService.downvote();
//     // }
//   }
// };
//   $routeProvider.when('/', routeDefinition);
//   $routeProvider.when('/shares', routeDefinition);
// }])
// .controller('SharesCtrl', ['$location', 'shares', 'shareService', 'Share', 'voteService', function ($location, shares, shareService, Share, voteService) {
//
//
// var self = this;
//
//   self.shares = shares;
//   // self.votes = function (upvote, downvote) {
//   //   return votes = upvotes - downvotes;
//   // };
//
//   self.upvote = function (share) {
//     voteService.upvote(share);
//   };
//
//   self.downvote = function (share) {
//     voteService.downvote(share);
//   };
//
//   self.goToComments = function(share) {
//     $location.path('/shares/' + share._id + '/comments');
//   };
//
//
// }]);

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);


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

//# sourceMappingURL=app.js.map