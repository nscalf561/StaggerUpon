app.controller('apiController', ['$scope', '$http',
              function ($scope, $http) {

  $scope.getBars = function() {
    $http.get('/api')
      .then(function(data) {
        console.log('Success', data);
        $scope.data = data;
      }, function(data, status) {
        console.log('Response error', status, data);
      });
  };

  $scope.getAllBars = function () {
    $http.get('/api/getAllBars')
      .then(function(data) {
        $scope.data = data;
      }, function(data, status) {
        console.log('Error getting all bars via searching Yelp!');
      });
  };

}]);
