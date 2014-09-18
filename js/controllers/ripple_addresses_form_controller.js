rippleGatewayApp.controller('RippleAddressesFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.address = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getRippleAddress($routeParams.id, function(err, res) {
        if (!err) {
          $scope.address = res.ripple_address;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateRippleAddress = function() {
      $api.updateRippleAddress($routeParams.id, $scope.address, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple address updated.';

          $timeout(function() {
            $location.path('/database/ripple_addresses');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };

    $scope.createRippleAddress = function() {
      $api.createRippleAddress($scope.address, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Ripple address updated.';

          $timeout(function() {
            $location.path('/database/ripple_addresses');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };
}]);
