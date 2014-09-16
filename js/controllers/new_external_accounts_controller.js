rippleGatewayApp.controller('NewExternalAccountsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.account = {};

    $scope.createExternalAccount = function() {
      $api.createExternalAccount($scope.account, function(err, res) {
        if (!err) {
          $location.path('/database/external_accounts');
        }
      });
    };
}]);
