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

  $scope.orderProperty = 'createdAt';

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
        if(resp.ripple_address && (resp.ripple_address.id == key.id)){
          key.independent_address = resp.ripple_address.address;
        }
      });
    })
   
  });

  $api.getWithdrawals(function(err, resp){
    $scope.withdrawals = resp.withdrawals;
    $scope.isLoading = false;
  });

  function getClearedTransactions(fn){
    var outstandingCalls = 2;
    var transactions = [];

    function handleResponse(resp){
      resp.external_transactions.forEach(function(transaction){
        transactions.push(transaction);
      });
      outstandingCalls -= 1;
      if (outstandingCalls == 0){
        fn(null, transactions);
      }
    }
    $api.getExternalTransactions({ status: 'processed' }, function(err, resp){
      if (err) { fn(err, null); return };
      handleResponse(resp);
    });

    $api.getExternalTransactions({ status: 'cleared' }, function(err, resp){
      if (err) { fn(err, null); return };
      handleResponse(resp, fn);
    });
  }

  $scope.clearWithdrawal = function(id) {
    $api.clearWithdrawal(id, function(err){
      if(!err){
        $api.getWithdrawals(function(err, resp){
          $scope.withdrawals = resp.withdrawals;
          $scope.isLoading = false;
        });
      }
    });
  };

  $scope.submitDepositForm = function(valid){
      $scope.isSubmitting = true;
      delete $scope.deposit.amount2;

      console.log($scope.deposit);
      $api.makeDeposit($scope.deposit, function(data){
        getClearedTransactions(function(transactions){
          $scope.externalTransactions = resp.transactions;
          $scope.isSubmitting = false;
          $scope.isLoading = false;
          angular.forEach($scope.deposit, function(key, value){
            $scope.deposit[value] = null;
          });
        });
      });
  };

  getClearedTransactions(function(err, transactions){
    if (err) { console.log('error', err); return; };
    $scope.externalTransactions = transactions;
    $scope.isSubmitting = false;
    $scope.isLoading = false;
  });

  $window.api = $api;

}]);

