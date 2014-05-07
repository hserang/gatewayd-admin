rippleGatewayApp.service('ApiService', ['$http', function($http) {

  function success(fn){
    return function(resp, status, headers, config){
      fn(null, resp);
    };
  };

  function error(fn){
    return function(resp, status, headers, config){
      fn(resp, null);
    };
  };
 
  function API(){};

  API.prototype.getCurrencies = function(fn) {
    $http.get('/v1/currencies')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getUserRippleTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/ripple_transactions')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getUserExternalTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/external_transactions')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.makeDeposit = function(externalAccountId, amount, currency, fn) {
    var opts = { 
      external_account_id: externalAccountId,
      amount: amount,
      currency: currency
    };

    $http({ method: "POST", url: '/v1/deposits/' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.clearWithdrawal = function(id, fn) {
    $http({ method: "POST", url: '/v1/withdrawals/'+id+'/clear' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getIncomingPayments = function(fn) {
    $http({method: 'GET', url: '/v1/payments/incoming'})
    .success(success(fn))
    .error(error(fn));
  }

  API.prototype.getPendingWithdrawals = function(fn) {
    $http({method: 'GET', url: '/v1/withdrawals'})
    .success(success(fn))
    .error(error(fn));
  }

  API.prototype.getQueuedDeposits = function(fn) {
    $http({method: 'GET', url: '/v1/deposits'})
    .success(success(fn))
    .error(error(fn));
  }

  API.prototype.getOutgoingPayments = function(fn) {
    $http({method: 'GET', url: '/v1/payments/outgoing'})
    .success(success(fn))
    .error(error(fn));
  }

  API.prototype.getUsers = function(fn){
    $http({ method: 'GET', url: '/v1/users' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getExternalTransactions = function(fn){
    $http({ method: 'GET', url: '/api/external_transactions' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getWithdrawals = function(fn){
    $http({ method: 'GET', url: '/v1/withdrawals' })
    .success(success(fn))
    .error(error(fn));
  };

  return new API;

}]);

