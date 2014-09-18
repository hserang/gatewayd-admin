rippleGatewayApp.controller('GatewayTransactionsFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {
      external_transaction_id: '',
      ripple_transaction_id: '',
      policy_id: '',
      state: ''
    };

    $scope.createGatewayTransaction = function() {
      $api.createGatewayTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/gateway_transactions');
        }
      });
    };
}]);
