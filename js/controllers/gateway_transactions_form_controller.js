rippleGatewayApp.controller('GatewayTransactionsFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getGatewayTransaction($routeParams.id, function(err, res) {
        console.log(res);
        if (!err && res.success) {
          $scope.transaction = res.transaction;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.updateGatewayTransaction = function() {
      $api.updateGatewayTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/gateway_transactions');
        }
      });
    };

    $scope.createGatewayTransaction = function() {
      $api.createGatewayTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/gateway_transactions');
        }
      });
    };
}]);
