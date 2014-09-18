rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
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

    $scope.updateRippleTransaction = function(index) {
      $location.path('/database/ripple_transactions/' + index + '/update');
    };
}]);
