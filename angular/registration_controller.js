rippleGatewayApp.controller('RegistrationCtrl', ['$scope', 'UserService', '$location', function($scope, $user, $location) {
  $scope.newUser = {
    name: '',
    password: '',
    ripple_address: ''
  }; 
  $scope.register = function() {
    $user.register($scope.newUser, function(err, user){
      if (err) {
        console.log('error registering user:', err);
      } else { 
        console.log('registered a new user:', user);
        $location.path('/app#/users/35');
      }
    });
  };
}]);

