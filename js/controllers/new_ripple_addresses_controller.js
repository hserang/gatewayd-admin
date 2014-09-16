rippleGatewayApp.controller('NewRippleAddressesCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.address = {};

    $scope.createRippleAddress = function() {
      $api.createRippleAddress($scope.address, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_addresses');
        }
      });
    };
}]);
