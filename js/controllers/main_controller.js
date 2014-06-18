rippleGatewayApp.controller('MainCtrl', ['$scope', '$rootScope',  '$location', 'UserService', 'ApiService', function($scope, $rootScope, $location, $user, $api) {
  $scope.$on('$routeChangeStart', function(next, current) {
    $rootScope.setupComplete = false;

    $api.setupStatus(function(error, response){
      if(error || !response.success){
        console.log('setup status error', error);
      } else if (!response.setup_complete) {
          $location.path('/setup');
      } else if (!$user.isLogged && $location.path() != '/register') {
          $rootScope.setupComplete = true;
          $location.path("/login");
      }
    });
  });

  $scope.user = $user;

}]);

