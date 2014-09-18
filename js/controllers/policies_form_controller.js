rippleGatewayApp.controller('PoliciesFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policy = {};

    $scope.createPolicy = function() {
      $api.createPolicy($scope.policy, function(err, res) {
        if (!err) {
          $location.path('/database/policies');
        }
      });
    };
}]);
