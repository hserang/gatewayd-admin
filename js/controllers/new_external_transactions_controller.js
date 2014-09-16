rippleGatewayApp.controller('NewExternalTransactionsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {
      amount: '',
      currency: '',
      deposit: '',
      external_account_id: '',
      status: '',
      ripple_transaction_id: '',
      uid: '',
      data: ''
    };

    $scope.createExternalTransaction = function() {
      var toBool = {
        true: true,
        false: false
      };

      $scope.transaction.deposit = toBool[$scope.transaction.deposit];

      $api.createExternalTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/external_transactions');
        }
      });
    };
}]);
