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
