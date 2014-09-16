rippleGatewayApp.controller('NewRippleAddressesCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.address = {
      managed: false,
      address: '',
      type: '',
      user_id: '',
      tag: '',
      secret: '',
      previous_transaction_hash: '',
      uid: '',
      data: ''
    };

    $scope.createRippleAddress = function() {
      $scope.user.managed = !!$scope.user.managed;

      $api.createRippleAddress($scope.user, function(err, res) {
        if (!err) {
          $location.path('/database/users');
        }
      });
    };
}]);
