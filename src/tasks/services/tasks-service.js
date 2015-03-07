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
