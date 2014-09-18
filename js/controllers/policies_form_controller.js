rippleGatewayApp.controller('PoliciesFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policy = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getPolicy($routeParams.id, function(err, res) {
        if (!err && res.success) {
          $scope.policy = res.policy;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.createPolicy = function() {
      $api.createPolicy($scope.policy, function(err, res) {
        if (!err) {
          $location.path('/database/policies');
        }
      });
    };
}]);
