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
