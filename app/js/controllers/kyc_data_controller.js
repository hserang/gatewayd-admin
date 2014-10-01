rippleGatewayApp.controller('KycDataCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
    'KycDataModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.data = [];
    $scope.datum = {};

    //read
    $scope.data = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      Model.create($scope.datum).then(function() {
        $state.go('database.external_data');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.crudType = "update";
      $scope.datum = $scope.data[index];
    };

    $scope.submitUpdate = function() {
      Model.update($scope.datum).then(function() {
        $state.go('database.external_data');
      });
    };

    //delete
    $scope.remove = function(index) {
      var datum = $scope.data[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(datum);
      }
    };
}]);
