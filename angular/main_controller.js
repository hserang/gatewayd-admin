rippleGatewayApp.controller('MainCtrl', ['$scope', '$location', 'UserService', function($scope, $location, $user) {
  $scope.$on('$routeChangeStart', function(next, current) { 
    if (!$user.isLogged && $location.path() != '/register') {
      $location.path("/login");
    };
  });

  $scope.user = $user;
}]);

