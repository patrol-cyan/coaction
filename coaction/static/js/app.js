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
    controller: 'newTaskCtrl',
    controllerAs: 'vm',
    // resolve: {
    //   tasks: ['tasksService', function (tasksService) {
    //     return tasksService.addTask();
    //   }],
    // }
  };

  $routeProvider.when('/tasks/new', routeDefinition)
}])
.controller('newTaskCtrl', ['tasksService', function (tasksService) {
  var self = this;

  self.task = {
    title: '',
    description: '',
  }
}]);



self.addShare = function () {
    var share = self.newShare;
    self.newShare = Share();

    sharesService.addShare(share).then(function (data) {
      self.shares = self.shares.filter(function (existingShare) {
        return existingShare._id !== share._id;
      });
      refreshShares();
    });
  };

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

app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

app.factory('tasksService', ['$http', '$log', function($http, $log) {



  return {
    list: function () {
      return $http.get('/api/tasks').then(function(result) {
        return result.data.tasks;
      }).catch(function(err) {
        $log.log(err);
        // throw err;
      });
    }

  };
}]);


self.addShare = function () {
    var share = self.newShare;
    self.newShare = Share();

    sharesService.addShare(share).then(function (data) {
      self.shares = self.shares.filter(function (existingShare) {
        return existingShare._id !== share._id;
      });
      refreshShares();
    });
  };

//# sourceMappingURL=app.js.map