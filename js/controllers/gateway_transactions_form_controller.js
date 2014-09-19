rippleGatewayApp.controller('GatewayTransactionsFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getGatewayTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.transaction;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateGatewayTransaction = function() {
      $api.updateGatewayTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Gateway transaction updated.';

          $timeout(function() {
            $location.path('/database/gateway_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createGatewayTransaction = function() {
      $api.createGatewayTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Gateway transaction updated.';

          $timeout(function() {
            $location.path('/database/gateway_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
