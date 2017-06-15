var app = angular.module("StaggerUpon", ['ui.router']);

app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider", "$httpProvider",
          ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) => {

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
    })

    .state('apiHome', {
      url: '/api',
      templateUrl: 'templates/api.html',
      controller: 'apiController'
    })

    .state('getAllBars', {
      url: '/api/getAllBars',
      tempalteUrl: 'templates/getAllBars.html',
      controller: 'barsController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requiredBase: false
    });
}]);

