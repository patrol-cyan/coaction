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
