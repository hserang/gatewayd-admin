rippleGatewayApp.controller('LoginCtrl', ['$scope', 'UserService', '$location', function($scope, $user, $location) {

  $scope.login = function() {
//    var password = $scope.user.password;
//    var name = $scope.user.name;

    var password = '512783f7fcf7d41474b1a7e9724ef57a80f1bfcd8fc797e172a89baaff0a4e22';
    var name = 'admin@example.com';
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
            $location.path('/overview');
          } else {
            $user.name = user.name;
            $user.id = user.id;
            $user.isAdmin = false;
            $location.path('/users/'+user.id);
          }
        }
      } 
    });
  }
}]);

