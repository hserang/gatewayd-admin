rippleGatewayApp.controller('RippleAddressesFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.address = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getRippleAddress($routeParams.id, function(err, res) {
        if (!err) {
          $scope.address = res.ripple_address;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.updateRippleAddress = function() {
      $api.updateRippleAddress($routeParams.id, $scope.address, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_addresses');
        }
      });
    };

    $scope.createRippleAddress = function() {
      $api.createRippleAddress($scope.address, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_addresses');
        }
      });
    };
}]);
