rippleGatewayApp.controller('NewUsersCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    // INCOMPLETE
    $scope.user = {
      name: ''
    };

    $scope.createUser = function() {
      $api.createUser($scope.user, function(err, res) {
        if (!err) {
          $location.path('/database/users');
        }
      });
    };
}]);
