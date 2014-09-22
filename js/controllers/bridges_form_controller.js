rippleGatewayApp.controller('BridgesFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.bridge = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getBridge($routeParams.id, function(err, res) {
        if (!err) {
          $scope.bridge = res.bridge;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateBridge = function() {
      $api.updateBridge($routeParams.id, $scope.bridge, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Bridge updated.';

          $timeout(function() {
            $location.path('/database/bridges');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createBridge = function() {
      $api.createBridge($scope.bridge, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Bridge updated.';

          $timeout(function() {
            $location.path('/database/bridges');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
