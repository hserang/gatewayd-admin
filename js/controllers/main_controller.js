rippleGatewayApp.controller('MainCtrl', [
  '$scope', '$rootScope', '$location', '$state', 'UserService', 'ApiService',
  function($scope, $rootScope, $location, $state, $user, $api) {
    $scope.$on('$routeChangeStart', function(next, current) {

      /*
       $rootScope.setupComplete = false;

       $api.setupStatus(function(error, response){
         if(error || !response.success){
           console.log('setup status error', error);
         } else if (!response.setup_complete) {
           $state.go('setup');
         } else if (!$user.isLogged && $location.path() != '/register') {
           $rootScope.setupComplete = true;
           $state.go('login');
         }
       });
       */
    });

    $scope.user = $user;
  }]);
