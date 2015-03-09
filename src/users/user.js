app.factory('User', function () {
  return function (spec) {
    spec = spec || {};
    return {
      name: spec.name,
      email: spec.email,
      password: spec.password,
      password_verification: spec.password_verification
    };
  };
});
