rippleGatewayApp.controller('RippleTransactionsFormCtrl', [
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

      $api.getRippleTransaction($routeParams.id, function(err, res) {
        if (!err) {
          $scope.transaction = res.ripple_transaction;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateRippleTransaction = function() {
      $api.updateRippleTransaction($routeParams.id, $scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple transaction updated.';

          $timeout(function() {
            $location.path('/database/ripple_transactions');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createRippleTransaction = function() {
      $api.createRippleTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple transaction updated.';

          $timeout(function() {
            $location.path('/database/ripple_transactions');
          }, 1000);
        } else {
          console.log(err);
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
