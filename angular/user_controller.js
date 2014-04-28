rippleGatewayApp.controller('UserCtrl', ['$scope', '$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
  var userId = $routeParams.id;
  $scope.loading = true;  
  $scope.externalTransactions = [];
  getUserExternalTransactions($http, userId, function(err, transactions) {
    $scope.loading = false;
    $scope.externalTransactions = transactions;
  });

  getUserRippleTransactions($http, userId, function(err, transactions) {
    $scope.loading = false;
    $scope.rippleTransactions = transactions;
  });
}]);

