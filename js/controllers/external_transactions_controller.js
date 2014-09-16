rippleGatewayApp.controller('ExternalTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getAllExternalTransactions(function(err, res) {
      if (!err) {
        $scope.transactions = res.external_transactions;
      }
    });
}]);
