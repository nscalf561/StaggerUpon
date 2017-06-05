var app = angular.module("AngelProperties", ['ui.router']);

app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider", ($stateProvider, $locationProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl : 'templates/home.html',
      // controller : 'mainController'
    })

    .state('login', {
      url: '/login',
      templateUrl : 'templates/login.html',
      controller : 'loginController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requiredBase: false
    });
}]);

app.controller('loginController', ($scope) => {
  $scope.loginForm = true;
  $scope.switchForm = () => {
    $scope.loginForm = $scope.loginForm ? false : true;
  };
});
