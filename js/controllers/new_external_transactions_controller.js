rippleGatewayApp.controller('NewExternalTransactionsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};

    $scope.createExternalTransaction = function() {
      $api.createExternalTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/external_transactions');
        }
      });
    };
}]);
