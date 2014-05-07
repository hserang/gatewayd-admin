rippleGatewayApp.service('ApiService', ['$http', function($http) {

  function success(resp, status, headers, config){
    fn(null, resp);
  }

  function error(resp, status, headers, config){
    fn(resp, null);
  }
 
  function API(){};

  API.prototype.getCurrencies = function(fn) {
    $http.get('/v1/currencies')
    .success(success)
    .error(error);
  };

  API.prototype.getUserRippleTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/ripple_transactions')
    .success(success)
    .error(error);
  };

  API.prototype.getUserExternalTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/external_transactions')
    .success(success)
    .error(error);
  };

  API.prototype.makeDeposit = function(externalAccountId, amount, currency) {
    var opts = { 
      external_account_id: externalAccountId,
      amount: amount,
      currency: currency
    };

    $http({ method: "POST", url: '/v1/deposits/' })
    .success(success)
    .error(error);
  };

  API.prototype.clearWithdrawal = function(id, fn) {
    $http({ method: "POST", url: '/v1/withdrawals/'+id+'/clear' })
    .success(success)
    .error(error);
  };

  API.prototype.getIncomingPayments = function() {
    $http({method: 'GET', url: '/v1/payments/incoming'})
    .success(success)
    .error(error);
  }

  API.prototype.getPendingWithdrawals = function() {
    $http({method: 'GET', url: '/v1/withdrawals'})
    .success(success)
    .error(error);
  }

  API.prototype.getQueuedDeposits = function() {
    $http({method: 'GET', url: '/v1/deposits'})
    .success(success)
    .error(error);
  }

  API.prototype.getOutgoingPayments = function() {
    $http({method: 'GET', url: '/v1/payments/outgoing'})
    .success(success)
    .error(error);
  }

  API.prototype.getUsers = function(){
    $http({ method: 'GET', url: '/v1/users' })
    .success(success)
    .error(error);
  };

  return new API;

}]);

