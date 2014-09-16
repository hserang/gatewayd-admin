rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.accounts = [];

    $api.getExternalAccounts(function(err, res) {
      if(!err){
        $scope.accounts = res.external_accounts;
      }
    });
}]);
