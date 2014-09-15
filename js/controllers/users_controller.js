rippleGatewayApp.controller('UsersCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.users = [];

    $api.getUsers(function(err, response) {
      if (!err && response.success) {
        $scope.users = response.users;
      }
    });
}]);
