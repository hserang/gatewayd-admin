rippleGatewayApp.controller('ExternalAccountsFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.account = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getExternalAccount($routeParams.id, function(err, res) {
        if (!err && res.success) {
          $scope.account = res.external_account;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.updateExternalAccount = function() {
      $api.updateExternalAccount($routeParams.id, $scope.account, function(err, res) {
        if (!err) {
          $location.path('/database/external_accounts');
        }
      });
    };

    $scope.createExternalAccount = function() {
      $api.createExternalAccount($scope.account, function(err, res) {
        if (!err) {
          $location.path('/database/external_accounts');
        }
      });
    };
}]);
