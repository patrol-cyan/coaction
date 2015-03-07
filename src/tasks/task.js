app.factory('Task', [ function() {

  return function(spec) {
    spec = spec || {};

    var self = {
      assignee: spec.assignee,
      completion_status: spec.completionStatus,
      due_date: spec.dueDate,
      id: spec.taskId,
      owner: spec.userId,
      started_status: spec.startedStatus || 'new',
      title: spec.title,
      description: spec.description,
      comments: spec.comments || []
      //not sure if this will work with how
      //they're setting up the comment class

    };

    return self;
  };
}]);
