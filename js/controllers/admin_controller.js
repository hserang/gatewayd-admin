rippleGatewayApp.controller('AdminCtrl', [
  '$scope', 
  '$http', 
  '$location',
  '$window',
  'UserService',
  'ApiService', function($scope, $http, $location, $window, $user, $api){

  if (!$user.isAdmin) {  $location.path('/login') };

  $scope.path = function() { $location.path() };

  $scope.externalTransactions = [];
  $scope.users = [];
  $scope.withdrawals = [];
  $scope.currencies = [];
  $scope.clearedTransactions = [];
  $scope.accountBalance = [];
  $scope.liabilities = [];
  $scope.deposit = {};

  //UI states
  $scope.isSubmitting = false;
  $scope.isLoading = true;

  $api.getBalance(function(err, resp){
    if(!err && resp.success){
      $scope.accountBalance = resp.balances;
    }
  });

  $api.getLiabilities(function(err, resp){
    if(!err && resp.success){
      $scope.liabilities = resp.balances;
      $scope.isLoading = false;
    }
  });

  $api.getCurrencies(function(err, resp){
    angular.forEach(resp.CURRENCIES, function(key, value){
      $scope.currencies.push(value);
    });
  });

  $api.getUsers(function(err, resp){
    $scope.users = resp.users;

    angular.forEach(resp.users, function(key, value){
      $api.getRippleAddress(key.id, function(err, resp) {
        if(resp.ripple_address.id == key.id){
          key.independent_address = resp.ripple_address.address;
        }
      });
    })
   
  });

  $api.getWithdrawals(function(err, resp){
    $scope.withdrawals = resp.withdrawals;
    $scope.isLoading = false;
  });

  $api.getExternalTransactions(function(err, resp){
    $scope.externalTransactions = resp.deposits;
    $rootScope.isLoading = false;
  });

  $api.getClearedTransactions(function(err, resp){
    if(!err)
      $scope.clearedTransactions = resp.deposits;
  });

  $scope.clearWithdrawal = function(id) {
    $api.clearWithdrawal(id, function(err){
      if(!err){
        $api.getWithdrawals(function(err, resp){
          $scope.withdrawals = resp.withdrawals;
          $rootScope.isLoading = false;
        });
      }
    });
  };

  $scope.submitDepositForm = function(valid){
      $scope.isSubmitting = true;
      delete $scope.deposit.amount2;

      console.log($scope.deposit);
      $api.makeDeposit($scope.deposit, function(data){

        $api.getExternalTransactions(function(err, resp){
          $scope.externalTransactions = resp.deposits;
          $scope.isSubmitting = false;
          $rootScope.isLoading = false;

          angular.forEach($scope.deposit, function(key, value){
            $scope.deposit[value] = null;
          });
        });
      });
  };

  $window.api = $api;

}]);

