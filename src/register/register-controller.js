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
