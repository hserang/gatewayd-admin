rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getRippleTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.ripple_transactions;
      }
    });
}]);
