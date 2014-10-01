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

    //read
    $scope.data = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.datum = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.datum).then(function() {
        $state.go('database.external_data');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.datum = $scope.data[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.datum).then(function() {
        $state.go('database.external_data');
        $scope.data[$scope.currentIndex] = $scope.datum;
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
