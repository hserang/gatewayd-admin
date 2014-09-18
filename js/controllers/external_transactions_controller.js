rippleGatewayApp.controller('ExternalTransactionsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getAllExternalTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.external_transactions;
      }
    });

    $scope.deleteExternalTransaction = function(index) {
      var transaction = $scope.transactions[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteExternalTransaction(transaction.id, function(err, res) {
          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };

    $scope.updateExternalTransaction = function(index) {
      $location.path('/database/external_transactions/' + index + '/update');
    };
}]);
