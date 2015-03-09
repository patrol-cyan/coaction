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
