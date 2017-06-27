app.controller('loginController', function ($scope) {

  $scope.submitForm = function (userLoginForm) {
    console.log('email:', $scope.email);
    console.log('password:', $scope.password);
    console.log(userLoginForm);
  };

});
