app.factory('Task', [ function() {

  return function(spec) {
    spec = spec || {};

    var self = {
      assignee: spec.assignee || null,
      completion_status: spec.completionStatus,
      description: spec.description,
      due_date: spec.dueDate || null,
      id: spec.taskId,
      owner: spec.userId,
      started_status: spec.startedStatus,
      status: spec.status || "TODO",
      title: spec.title || null,
      // comments: spec.comments || []
      //not sure if this will work with how
      //they're setting up the comment class

    };

    return self;
  };
}]);
