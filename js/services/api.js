rippleGatewayApp.service('ApiService', ['$http', function($http) {

  function API(){};

  API.prototype.getCurrencies = function(fn) {
    $http.get('/v1/currencies')
    .success(function(resp, status, headers, config) {
      fn(null, resp.currencies);
    })
    .error(function(data, stats, headers, config) {
      fn(data, null);
    });
  };

  API.prototype.getUserRippleTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/ripple_transactions')
    .success(function(response, status, headers, config) {
      fn(null, response.rippleTransactions);
    })
    .error(function(data, status, headers, config) {
      fn(data, null);
    });
  };

  API.prototype.getUserExternalTransactions = function(userId, fn) {
    http.get('/v1/users/'+userId+'/external_transactions')
    .success(function(response, status, headers, config) {
      fn(null, response.externalTransactions);
    })
    .error(function(data, status, headers, config) {
      fn(data, null);
    });
  };

  API.prototype.makeDeposit = function(externalAccountId, amount, currency) {
    var opts = { 
      external_account_id: externalAccountId,, 
      amount: amount,
      currency: currency
    };

    $http.post('/v1/deposits', opts)
    .success(function(response, status, headers, config) {
      fn(null, response.deposit);
    })
    .error(function(response, status, headers, config) {
      fn(response.error, null);
    });
  };

  return new API;

}]);

