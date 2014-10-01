rippleGatewayApp.controller('PoliciesCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
    'PoliciesModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.policies = [];
    $scope.policy = {};

    //read
    $scope.policies = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      Model.create($scope.policy).then(function() {
        $state.go('database.policies');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.crudType = "update";
      $scope.policy = $scope.policies[index];
    };

    $scope.submitUpdate = function() {
      Model.update($scope.policy).then(function() {
        $state.go('database.policies');
      });
    };

    //delete
    $scope.remove = function(index) {
      var policy = $scope.policies[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(policy);
      }
    };
}]);
