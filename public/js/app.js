var app = angular.module("StaggerUpon", ['ui.router']);

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
    })

    .state('signup', {
      url: '/signup',
      templateUrl : 'templates/signup.html',
      controller : 'signupController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requiredBase: false
    });
}]);

