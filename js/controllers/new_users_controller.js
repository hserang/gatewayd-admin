rippleGatewayApp.controller('NewUsersCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.user = {};

    $scope.createUser = function() {
      $api.createUser($scope.user, function(err, res) {
        if (!err) {
          $location.path('/database/users');
        }
      });
    };
}]);
