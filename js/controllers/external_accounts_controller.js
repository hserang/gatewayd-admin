rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.accounts = [];

    $api.getExternalAccounts(function(err, response) {
      if(!err){
        $scope.accounts = response.external_accounts;
      }
    });
}]);
