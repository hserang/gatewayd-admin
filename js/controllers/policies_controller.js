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

    //read
    $scope.policies = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.policy = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.policy).then(function() {
        $state.go('database.policies');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.policy = $scope.policies[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.policy).then(function() {
        $state.go('database.policies');
        $scope.policies[$scope.currentIndex] = $scope.policy;
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
