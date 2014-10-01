rippleGatewayApp.controller('UserCtrl', [
  '$scope', 'UserService', '$state',
  function($scope, $user, $state) {

    if (!$user.isLogged) {
      $state.go('login');
    }
}]);
