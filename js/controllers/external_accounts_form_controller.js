rippleGatewayApp.controller('ExternalAccountsFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.account = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getExternalAccount($routeParams.id, function(err, res) {
        if (!err) {
          $scope.account = res.external_account;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateExternalAccount = function() {
      $api.updateExternalAccount($routeParams.id, $scope.account, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External account updated.';

          $timeout(function() {
            $location.path('/database/external_accounts');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };

    $scope.createExternalAccount = function() {
      $api.createExternalAccount($scope.account, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'External account created.'

          $timeout(function() {
            $location.path('/database/external_accounts');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };
}]);
