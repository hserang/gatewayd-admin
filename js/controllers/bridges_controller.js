rippleGatewayApp.controller('BridgesCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.bridges = [];

    $api.getBridges(function(err, res) {
      if (!err) {
        $scope.bridges = res.bridges;
      }
    });

    $scope.deleteBridge = function(index) {
      var bridge = $scope.bridges[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteBridge(bridge.id, function(err, res) {
          if (!err) {
            $scope.bridges.splice(index, 1);
          }
        });
      }
    };

    $scope.updateBridge = function(index) {
      $location.path('/database/bridges/' + $scope.bridges[index].id + '/update');
    };
}]);
