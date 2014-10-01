rippleGatewayApp.controller('BridgesCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
     'BridgesModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.bridges = [];
    $scope.bridge = {};

    //read
    $scope.bridges = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      Model.create($scope.bridge).then(function() {
        $state.go('database.bridges');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.crudType = "update";
      $scope.bridge = $scope.bridges[index];
    };

    $scope.submitUpdate = function() {
      Model.update($scope.bridge).then(function() {
        $state.go('database.bridges');
      });
    };

    //delete
    $scope.remove = function(index) {
      var bridge = $scope.bridges[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(bridge);
      }
    };
}]);
