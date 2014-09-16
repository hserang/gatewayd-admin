rippleGatewayApp.controller('NewRippleAddressesCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.address = {
      managed: '',
      address: '',
      type: '',
      user_id: '',
      tag: '',
      // secret: '',
      previous_transaction_hash: '',
      uid: '',
      data: ''
    };

    $scope.createRippleAddress = function() {
      var toBool = {
        true: true,
        false: false
      };

      $scope.user.managed = toBool[$scope.address.managed];

      $api.createRippleAddress($scope.address, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_addresses');
        }
      });
    };
}]);
