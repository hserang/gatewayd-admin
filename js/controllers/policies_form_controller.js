rippleGatewayApp.controller('PoliciesFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.policy = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getPolicy($routeParams.id, function(err, res) {
        if (!err) {
          $scope.policy = res.policy;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updatePolicy = function() {
      $api.updatePolicy($routeParams.id, $scope.policy, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Policy updated.';

          $timeout(function() {
            $location.path('/database/policies');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createPolicy = function() {
      $api.createPolicy($scope.policy, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'Policy updated.';

          $timeout(function() {
            $location.path('/database/policies');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
