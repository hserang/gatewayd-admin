rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope',
  'UserService',
  'ApiService',
  '$window', function($scope, $user, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policies = [];

    $api.getPolicies(function(err, res) {
      if (!err && res.success) {
        $scope.policies = res.policies;
      }
    });

    $scope.deletePolicy = function(index) {
      var policy = $scope.policies[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deletePolicy(policy.id, function(err, res) {
          if (!err) {
            $scope.policies.splice(index, 1);
          }
        });
      }
    };
}]);
