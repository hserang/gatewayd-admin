rippleGatewayApp.controller('UserCtrl', ['$scope', 'UserService', '$location', function($scope, $user, $location) {
  if (!$user.isLogged) {  $location.path('/login') };

}]);

