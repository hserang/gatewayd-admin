rippleGatewayApp.controller('UsersFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.user = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getUser($routeParams.id, function(err, res) {
        if (!err && res.success) {
          $scope.user = res.users;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.updateUser = function() {
      $api.updateUser($routeParams.id, $scope.user, function(err, res) {
        if (!err) {
          $location.path('/database/users');
        }
      });
    };

    $scope.createUser = function() {
      $api.createUser($scope.user, function(err, res) {
        if (!err) {
          $location.path('/database/users');
        }
      });
    };
}]);
