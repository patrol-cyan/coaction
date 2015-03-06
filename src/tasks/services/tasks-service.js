app.factory('tasksService', function() {

  return {
    list: function () {
      return [{
        title: "getsss stuff done",
        description: "as fast as you can"
      },{
        title: "get more stuff done",
        description: "faster"
      }];
      // return ajaxHelper.call($http.get('/api/tasks'));
    },

  };
});
