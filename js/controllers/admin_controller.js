rippleGatewayApp.controller('AdminCtrl', [
  '$scope', 
  '$http', 
  '$location',
  '$window',
  'UserService',
  'ApiService', function($scope, $http, $location, $window, $user, $api){

  if (!$user.isAdmin) {  $location.path('/login') };

  $scope.path = function() {$location.path() };

  $scope.loading = true;
  $scope.isHome = false;
  $('#highlighted').hide();

  console.log('admin controller');

  $window.api = $api;

}]);

