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

  function serialize(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  function API(){};

  API.prototype.getCurrencies = function(fn) {
    $http.get('/v1/currencies')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getUserRippleTransactions = function(userId, fn) {
    $http.get('/v1/users/'+userId+'/ripple_transactions')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getUserExternalTransactions = function(userId, fn) {
    $http.get('/v1/users/'+userId+'/external_transactions')
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.makeDeposit = function(deposit, fn) {
    var opts = {
      external_account_id: deposit.externalAccountId,
      amount: deposit.amount,
      currency: deposit.currency
    };

    $http({ method: "POST", url: '/v1/deposits', data: opts })
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

  API.prototype.getAllExternalTransactions = function(fn){
    $http({ method: 'GET', url: '/v1/external_transactions' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getClearedTransactions = function(fn){
    $http({ method: 'GET', url: '/v1/cleared' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getExternalTransactions = function(query, fn){
    $http({ method: 'GET', url: '/v1/external_transactions?'+serialize(query) })
    .success(success(fn))
    .error(error(fn));
  }

  API.prototype.getWithdrawals = function(fn){
    $http({ method: 'GET', url: '/v1/withdrawals' })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getBalance = function(fn){
    $http({method: 'GET', url: '/v1/balances'})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getLiabilities = function(fn){
    $http({method: 'GET', url: '/v1/liabilities'})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getRippleAddress = function(id,fn){
    $http({method: 'GET', url: '/v1/ripple_addresses/'+id})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.setup = function(configuration, fn) {
    $http({
      method: 'POST',
      url: '/v1/setup',
      data: configuration
    })
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.setupStatus = function(fn) {
    $http({method: 'GET', url: '/v1/setup'})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.launchGateway = function(fn){
    var processes = { processes : ["deposits", "outgoing", "incoming", "withdrawals", "server"] };

    $http({method: 'POST', url: '/v1/start', data: processes})
      .success(success(fn))
      .error(error(fn));
  };

  API.prototype.getExternalAccounts = function(fn) {
    $http({method: 'GET', url: '/v1/external_accounts'})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getRippleTransactions = function(fn) {
    $http({method: 'GET', url: '/v1/ripple_transactions'})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.getRippleAddresses = function(fn) {
    $http({method: 'GET', url: '/v1/ripple_addresses'})
    .success(success(fn))
    .error(error(fn))
  };

  API.prototype.getPolicies = function(fn) {
    $http({method: 'GET', url: '/v1/policies'})
    .success(success(fn))
    .error(error(fn))
  };

  API.prototype.createUser = function(userInfo, fn) {
    $http({method: 'POST', url: '/v1/users', data: userInfo})
    .success(success(fn))
    .error(error(fn))
  };

  API.prototype.createExternalAccount = function(accountInfo, fn) {
    $http({method: 'POST', url: '/v1/external_accounts', data: accountInfo})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.createExternalTransaction = function(transactionDetails, fn) {
    console.log('hmmmmmm', transactionDetails);
    $http({method: 'POST', url: '/v1/external_transactions', data: transactionDetails})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.createPolicy = function(policyInfo, fn) {
    $http({method: 'POST', url: '/v1/policies', data: policyInfo})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.createRippleAddress = function(addressDetails, fn) {
    $http({method: 'POST', url: '/v1/ripple_addresses', data: addressDetails})
    .success(success(fn))
    .error(error(fn));
  };

  API.prototype.createRippleTransaction = function(transactionDetails, fn) {
    $http({method: 'POST', url: '/v1/ripple_transactions', data: transactionDetails})
    .success(success(fn))
    .error(error(fn));
  };

  // URL NOT IMPLEMENTED
  API.prototype.getKycData = function(fn) {
    $http({method: 'GET', url: '/v1/kyc_data'})
    .success(success(fn))
    .error(error(fn));
  };

  // URL NOT IMPLEMENTED
  API.prototype.createKycData = function(data, fn) {
    $http({method: 'POST', url: '/v1/kyc_data', data: data})
    .success(success(fn))
    .error(error(fn));
  };

  // URL NOT IMPLEMENTED
  API.prototype.getGatewayTransactions = function(fn) {
    $http({method: 'GET', url: '/v1/gateway_transactions'})
    .success(success(fn))
    .error(error(fn));
  };

  // URL NOT IMPLEMENTED
  API.prototype.createGatewayTransaction = function(transactionDetails, fn) {
    $http({method: 'POST', url: '/v1/gateway_transactions', data: transactionDetails})
    .success(success(fn))
    .error(error(fn));
  };

  return new API;

}]);

