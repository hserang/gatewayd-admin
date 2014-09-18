rippleGatewayApp.controller('GatewayTransactionsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getGatewayTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.gateway_transactions;
      }
    });

    $scope.deleteGatewayTransaction = function(index) {
      var transaction = $scope.transactions[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteGatewayTransaction(transaction.id, function(err, res) {
          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };
}]);
