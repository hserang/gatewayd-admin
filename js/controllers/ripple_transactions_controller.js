rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getRippleTransactions(function(err, response) {
      if (!err) {
        $scope.transactions = response.ripple_transactions;
      }
    });
}]);
