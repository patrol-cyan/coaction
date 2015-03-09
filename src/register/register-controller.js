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
