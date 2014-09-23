rippleGatewayApp.controller('LoginCtrl', ['$scope', 'UserService', '$location', function($scope, $user, $location) {

  $scope.login = function() {
    var password = $scope.user.password;
    var name = $scope.user.name;

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
            $location.path('/users');
          } else {
            $user.name = user.name;
            $user.id = user.id;
            $user.isAdmin = false;
            $location.path('/withdraw');
          }
        } else {
            $location.path('/login');
        }
      } 
    });
  }
}]);

