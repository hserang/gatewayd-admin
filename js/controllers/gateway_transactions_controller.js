rippleGatewayApp.controller('GatewayTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getGatewayTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.gateway_transactions;
      }
    });
}]);
