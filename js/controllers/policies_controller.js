rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policies = [];

    $api.getPolicies(function(err, res) {
      if (!err && res.success) {
        $scope.policies = res.policies;
      }
    });
}]);
