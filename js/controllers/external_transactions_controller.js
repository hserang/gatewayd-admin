rippleGatewayApp.controller('ExternalTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transactions = [];

    $api.getAllExternalTransactions(function(err, response) {
      if (!err) {
        $scope.transactions = response.deposits;
      }
    });
}]);
