rippleGatewayApp.controller('NewExternalAccountsCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.account = {
      data: '',
      name: '',
      user_id: '',
      uid: ''
    };

    $scope.createExternalAccount = function() {
      $api.createExternalAccount($scope.account, function(err, res) {
        if (!err) {
          $location.path('/database/external_accounts');
        }
      });
    };
}]);
