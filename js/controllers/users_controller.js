rippleGatewayApp.controller('UsersCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
     'UsersModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.users = [];

    //read
    $scope.users = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.user = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.user).then(function() {
        $state.go('database.users');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.user = $scope.users[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.user).then(function() {
        $state.go('database.users');
        $scope.users[$scope.currentIndex] = $scope.user;
      });
    };

    //delete
    $scope.remove = function(index) {
      var user = $scope.users[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(user);
      }
    };
}]);
