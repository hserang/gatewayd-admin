rippleGatewayApp.controller('RippleTransactionsFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getRippleTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.ripple_transaction;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.updateRippleTransaction = function() {
      $api.updateRippleTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_transactions');
        }
      });
    };

    $scope.createRippleTransaction = function() {
      $api.createRippleTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_transactions');
        }
      });
    };
}]);
