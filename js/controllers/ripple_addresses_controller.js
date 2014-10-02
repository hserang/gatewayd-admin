rippleGatewayApp.controller('RippleAddressesCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
     'RippleAddressesModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.addresses = [];

    //read
    $scope.addresses = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.address = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.address).then(function() {
        $state.go('database.ripple_addresses');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.address = $scope.addresses[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.address).then(function() {
        $state.go('database.ripple_addresses');
        $scope.addresses[$scope.currentIndex] = $scope.address;
      });
    };

    //delete
    $scope.remove = function(index) {
      var address = $scope.addresses[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(address);
      }
    };
}]);
