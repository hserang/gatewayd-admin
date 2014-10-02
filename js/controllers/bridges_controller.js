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

    //read
    $scope.bridges = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.bridge = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.bridge).then(function() {
        $state.go('database.bridges');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.bridge = $scope.bridges[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.bridge).then(function() {
        $state.go('database.bridges');
        $scope.bridges[$scope.currentIndex] = $scope.bridge;
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
