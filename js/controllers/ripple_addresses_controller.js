rippleGatewayApp.controller('RippleAddressesCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.addresses = [];

    $api.getRippleAddresses(function(err, response) {
      if (!err) {
        $scope.addresses = response.ripple_addresses;
      }
    });
}]);
