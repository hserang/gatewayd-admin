var rippleGatewayApp = angular.module('rippleGatewayApp', [
  'ngRoute'
]);

rippleGatewayApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'views/login.html'
    }).
    when('/setup', {
      controller: 'SetupCtrl',
      templateUrl: 'views/setup.html'
    }).
    when('/register', {
      controller: 'RegistrationCtrl',
      templateUrl: 'views/register.html'
    }).
    when('/overview', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/overview.html'
    }).
    when('/deposits', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/deposits.html'
    }).
    when('/withdrawals', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/withdrawals.html'
    }).
    when('/users', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/users.html'
    }).
    when('/users/:id', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/user.html'
    }).
    when('/account', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/account.html'
    }).
    when('/deposit', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/deposit.html'
    }).
    when('/withdraw', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/withdraw.html'
    }).
    when('/account', {
      controller: 'UserCtrl',
      templateUrl: 'views/user/account.html'
    }).
    when('/database/external_accounts' {
      controller: 'ExternalAccountsCtrl',
      templateUrl: '/views/database/externalAccounts.html'
    }).
    when('/database/external_transactions' {
      controller: 'ExternalTransactionsCtrl',
      templateUrl: '/views/database/externalTransactions.html'
    }).
    when('/database/gateway_transactions' {
      controller: 'GatewayTransactionsCtrl',
      templateUrl: '/views/database/gatewayTransactions.html'
    }).
    when('/database/kyc_data' {
      controller: 'KycDataCtrl',
      templateUrl: '/views/database/kycData.html'
    }).
    when('/database/policies' {
      controller: 'PoliciesCtrl',
      templateUrl: '/views/database/policies.html'
    }).
    when('/database/ripple_addresses' {
      controller: 'RippleAddressesCtrl',
      templateUrl: '/views/database/rippleAddresses.html'
    }).
    when('/database/ripple_transactions' {
      controller: 'RippleTransactionsCtrl',
      templateUrl: '/views/database/rippleTransactions.html'
    }).
    when('/database/users' {
      controller: 'UsersCtrl',
      templateUrl: '/views/database/users.html'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }
]);
