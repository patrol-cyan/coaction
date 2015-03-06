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
