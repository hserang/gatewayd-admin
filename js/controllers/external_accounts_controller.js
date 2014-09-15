rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $api.getExternalAccounts(function(err, response) {
      $scope.accounts = [];

      if(!err){
        $scope.accounts = response.external_accounts;
      }
    });
}]);
