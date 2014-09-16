rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policies = [];

    $api.getPolicies(function(err, response) {
      if (!err && response.success) {
        $scope.policies = response.policies;
      }
    });
}]);
