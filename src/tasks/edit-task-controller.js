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
