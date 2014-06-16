rippleGatewayApp.controller('MainCtrl', ['$scope', '$location', 'UserService', 'ApiService', function($scope, $location, $user, $api) {
  $scope.$on('$routeChangeStart', function(next, current) {

    $api.setupStatus(function(error, response){
      if(error || !response.success){
        console.log('setup status error', error);
      } else if (!response.setup_complete) {
          $location.path('/setup');
      } else if (!$user.isLogged && $location.path() != '/register') {
          $location.path("/login");
      }
    });
  });

  $scope.user = $user;

}]);

