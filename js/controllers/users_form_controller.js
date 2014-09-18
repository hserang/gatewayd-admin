rippleGatewayApp.controller('UsersFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.user = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getUser($routeParams.id, function(err, res) {
        if (!err) {
          $scope.user = res.users;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateUser = function() {
      $api.updateUser($routeParams.id, $scope.user, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'User updated.';

          $timeout(function() {
            $location.path('/database/users');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };

    $scope.createUser = function() {
      $api.createUser($scope.user, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'User updated.';

          $timeout(function() {
            $location.path('/database/users');
          }, 2000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join('\n');
        }
      });
    };
}]);
