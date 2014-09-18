rippleGatewayApp.controller('ExternalTransactionsFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getExternalTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.external_transaction;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.createExternalTransaction = function() {
      $api.createExternalTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/external_transactions');
        }
      });
    };
}]);
