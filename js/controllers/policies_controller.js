rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
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

    $scope.updatePolicy = function(index) {
      $location.path('/database/policies/' + $scope.policies[index].id + '/update');
    };
}]);
