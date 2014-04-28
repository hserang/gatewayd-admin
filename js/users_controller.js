rippleGatewayApp.controller('UsersCtrl', ['$scope', '$http','$location', function($scope, $http, $location){
  $scope.navigateToUser = function(id) { 
    $scope.loading = true;
    $location.path('/users/'+id);
  };

  $scope.path = $location.path();
  $scope.makeDeposit = function() {
    makeDeposit($scope, $http);
  };
  $scope.deposit = {};
  $scope.loading = true;
  $scope.isHome = false;
  $('#highlighted').hide();
  $scope.users = [];
  $scope.currencies = [];
  getCurrencies($http, function(err, currencies) {
    $scope.currencies = currencies; 
  });
  $http({ method: 'GET', url: '/v1/users' })
  .success(function(response, status, headers, config) {
    $scope.loading = false;
    $(".throbber").hide(); 
    $scope.users = response.users;
  })
  .error(function(data, status, headers, config) {
    $(".throbber").hide(); 
  });
}]);

