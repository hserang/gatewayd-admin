rippleGatewayApp.controller('LoginCtrl', [
    '$scope', 'UserService', '$state',
    function($scope, $user, $state) {

  $scope.login = function() {
    var password = $scope.user.password,
        name = $scope.user.name;

    $user.login(name, password, function(err, user) {

      if (err) {
        console.log('error', err);
      } else {
        if (user) {
          $user.isLogged = true;
          $user.password = password;
          if (user.admin) {
            $user.name = 'admin';
            $user.isAdmin = true;
            $state.go('overview');
          } else {
            $user.name = user.name;
            $user.id = user.id;
            $user.isAdmin = false;
            $state.go('withdraw');
          }
        } else {
          $state.go('login');
        }
      }
    });
  };
}]);
