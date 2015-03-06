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
      // return [{
      //   title: "getsss stuff done",
      //   description: "as fast as you can"
      // },{
      //   title: "get more stuff done",
      //   description: "faster"
      // }];
      return $http.get('/api/tasks').then(function(result) {
        return result.data;
      }).catch(function(err) {
        $log.log(err);
        // throw err;
      });
    }

  };
}]);

//# sourceMappingURL=app.js.map