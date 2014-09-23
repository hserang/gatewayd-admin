rippleGatewayApp.controller('RippleAddressesCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.addresses = [];

    $api.getRippleAddresses(function(err, res) {
      if (!err) {
        $scope.addresses = res.ripple_addresses;
      }
    });

    $scope.deleteRippleAddress = function(index) {
      var address = $scope.addresses[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteRippleAddress(address.id, function(err, res) {
          if (!err) {
            $scope.addresses.splice(index, 1);
          }
        });
      }
    };

    $scope.updateRippleAddress = function(index) {
      $location.path('/database/ripple_addresses/' + $scope.addresses[index].id + '/update');
    };
}]);
