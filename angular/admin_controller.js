rippleGatewayApp.controller('AdminCtrl', [
  '$scope', 
  '$http', 
  '$location', 
  'UserService', function($scope, $http, $location, $user){


  if (!$user.isAdmin) {  $location.path('/login') };

  $scope.path = function() {$location.path() };
  $scope.makeDeposit = function() {
    makeDeposit($scope, $http);
  };

  $scope.clearWithdrawal = function(id) {
    $('.throbber').show();
    $http({ method: "POST", url: '/v1/withdrawals/'+id+'/clear' })
    .success(function(response, status, headers, config) {
      getPendingWithdrawals();
      $('.throbber').hide();
    })
    .error(function(data, status, headers, config) {
      console.log('error:', data); 
      $('.throbber').hide();
    });
  };

  $scope.loading = true;
  $scope.isHome = false;
  $('#highlighted').hide();
  $scope.pendingWithdrawals = [];
  $scope.outgoingPayments = [];
  $scope.queuedDeposits = [];
  $scope.currencies = [];
  getCurrencies($http, function(err, currencies) {
    $scope.currencies = currencies; 
  });

  function getPendingWithdrawals() {
    $http({method: 'GET', url: '/v1/withdrawals'})
    .success(function(response, status, headers, config) {
      $scope.loading = false;
      $(".throbber").hide(); 
      $scope.pendingWithdrawals = response.withdrawals;
    })
    .error(function(data, status, headers, config) {
      $(".throbber").hide(); 
    });
  }

  function getOutgoingPayments() {
    $http({method: 'GET', url: '/v1/payments/outgoing'})
    .success(function(response, status, headers, config) {
      $scope.loading = false;
      $(".throbber").hide(); 
      $scope.outgoingPayments = response.payments;
    })
    .error(function(data, status, headers, config) {
      $(".throbber").hide(); 
    });
  }

  function getQueuedDeposits() {
    $http({method: 'GET', url: '/v1/deposits'})
    .success(function(response, status, headers, config) {
      $scope.loading = false;
      $(".throbber").hide(); 
      $scope.queuedDeposits = response.deposits;
    })
    .error(function(data, status, headers, config) {
      $(".throbber").hide(); 
    });
  }

  function getIncomingPayments() {
    $http({method: 'GET', url: '/v1/payments/incoming'})
    .success(function(response, status, headers, config) {
      $scope.loading = false;
      $(".throbber").hide(); 
      $scope.incomingPayments = response.payments;
    })
    .error(function(data, status, headers, config) {
      $(".throbber").hide(); 
    });
  }

  getIncomingPayments();
  getPendingWithdrawals();
  getOutgoingPayments();
  getQueuedDeposits();
}]);

