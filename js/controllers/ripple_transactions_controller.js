rippleGatewayApp.controller('RippleTransactionsCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
     'RippleTransactionsModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.transactions = [];
    $scope.transaction = {};

    //read
    $scope.transactions = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
    };

    $scope.submitCreate = function() {
      Model.create($scope.transaction).then(function() {
        $state.go('database.ripple_transactions');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.transaction = $scope.transactions[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.transaction).then(function() {
        $state.go('database.ripple_transactions');
        $scope.transactions[$scope.currentIndex] = $scope.transaction;
      });
    };

    //delete
    $scope.remove = function(index) {
      var transaction = $scope.transactions[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(transaction);
      }
    };
}]);
