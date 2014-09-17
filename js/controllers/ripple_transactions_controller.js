rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService',
  '$window', function($scope, $user, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getRippleTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.ripple_transactions;
      }
    });

    $scope.deleteRippleTransaction = function(index) {
      var transaction = $scope.transactions[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteRippleTransaction(transaction.id, function(err, res) {
          if (!err) {
            $scope.transactions.splice(index, 1);
          }
        });
      }
    };
}]);
