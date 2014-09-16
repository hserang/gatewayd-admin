rippleGatewayApp.controller('UsersCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.users = [];

    $api.getUsers(function(err, res) {
      if (!err && res.success) {
        $scope.users = res.users;
      }
    });
}]);
