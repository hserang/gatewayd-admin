rippleGatewayApp.controller('AdminCtrl', [
  '$scope', 
  '$http', 
  '$location',
  '$window',
  'UserService',
  'ApiService', function($scope, $http, $location, $window, $user, $api){

  if (!$user.isAdmin) {  $location.path('/login') };

  $scope.path = function() { $location.path() };

  $scope.externalTransactions = [];
  $scope.users = [];
  $scope.withdrawals = [];
  $scope.currencies = [];

  $api.getCurrencies(function(err, resp){
    $scope.currencies = resp.CURRENCIES;
  });

  $api.getUsers(function(err, resp){
    $scope.users = resp.users;
  });

  $api.getWithdrawals(function(err, resp){
    $scope.withdrawals = resp.withdrawals;
  });

  $api.getExternalTransactions(function(err, resp){
    $scope.externalTransactiosn = resp.data;
  });

  $window.api = $api;

}]);

