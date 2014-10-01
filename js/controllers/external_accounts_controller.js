rippleGatewayApp.controller('ExternalAccountsCtrl', [
  '$scope', 'UserService', 'ApiService', '$window', '$state', '$timeout',
    'ExternalAccountsModel',
  function($scope, $user, $api, $window, $state, $timeout, Model) {
    "use strict";

    if (!$user.isAdmin || !$user.isLogged) {
      $state.go('login');
      return false;
    }

    $scope.accounts = [];

    //read
    $scope.accounts = Model.get();

    //create
    $scope.create = function() {
      $scope.crudType = "create";
      $scope.account = {};
    };

    $scope.submitCreate = function() {
      Model.create($scope.account).then(function() {
        $state.go('database.external_accounts');
      });
    };

    //update
    $scope.update = function(index) {
      $scope.currentIndex = index;
      $scope.crudType = "update";
      $scope.account = $scope.accounts[index].clone();
    };

    $scope.submitUpdate = function() {
      Model.update($scope.account).then(function() {
        $state.go('database.external_accounts');
        $scope.accounts[$scope.currentIndex] = $scope.account;
      });
    };

    //delete
    $scope.remove = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('are you sure?');

      if (confirmed) {
        Model.delete(account);
      }
    };
}]);
