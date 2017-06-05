app.controller('signupController', function ($scope) {

  $scope.submitForm = function (userSignupForm) {
    console.log('email:', $scope.email);
    console.log('name:', $scope.name);
    console.log('phoneNumber:', $scope.phoneNumber);

    console.log('password:', $scope.password);
    console.log(userSignupForm);
  };

});
