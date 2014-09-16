rippleGatewayApp.controller('NewRippleTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {
      to_address_id: '',
      from_address_id: '',
      transaction_state: '',
      transaction_hash: '',
      to_amount: '',
      to_currency: '',
      to_issuer: '',
      from_amount: '',
      from_currency: '',
      from_issuer: ''
    };

    $scope.createRippleTransaction = function() {
      $api.createRippleTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_transactions');
        }
      });
    };
}]);
