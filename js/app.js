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
    when('/database/external_accounts', {
      controller: 'ExternalAccountsCtrl',
      templateUrl: '/views/database/externalAccounts.html'
    }).
    when('/database/external_accounts/:id/update', {
      controller: 'ExternalAccountsFormCtrl',
      templateUrl: '/views/database/externalAccountsForm.html'
    }).
    when('/database/external_accounts/new', {
      controller: 'ExternalAccountsFormCtrl',
      templateUrl: '/views/database/externalAccountsForm.html'
    }).
    when('/database/external_transactions', {
      controller: 'ExternalTransactionsCtrl',
      templateUrl: '/views/database/externalTransactions.html'
    }).
    when('/database/external_transactions/:id/update', {
      controller: 'ExternalTransactionsFormCtrl',
      templateUrl: '/views/database/externalTransactionsForm.html'
    }).
    when('/database/external_transactions/new', {
      controller: 'ExternalTransactionsFormCtrl',
      templateUrl: '/views/database/externalTransactionsForm.html'
    }).
    when('/database/gateway_transactions', {
      controller: 'GatewayTransactionsCtrl',
      templateUrl: '/views/database/gatewayTransactions.html'
    }).
    when('/database/gateway_transactions/:id/update', {
      controller: 'GatewayTransactionsFormCtrl',
      templateUrl: '/views/database/gatewayTransactionsForm.html'
    }).
    when('/database/gateway_transactions/new', {
      controller: 'GatewayTransactionsFormCtrl',
      templateUrl: '/views/database/gatewayTransactionsForm.html'
    }).
    when('/database/kyc_data', {
      controller: 'KycDataCtrl',
      templateUrl: '/views/database/kycData.html'
    }).
    when('/database/kyc_data/:id/update', {
      controller: 'KycDataFormCtrl',
      templateUrl: '/views/database/kycDataForm.html'
    }).
    when('/database/kyc_data/new', {
      controller: 'KycDataFormCtrl',
      templateUrl: '/views/database/kycDataForm.html'
    }).
    when('/database/policies', {
      controller: 'PoliciesCtrl',
      templateUrl: '/views/database/policies.html'
    }).
    when('/database/policies/:id/update', {
      controller: 'PoliciesFormCtrl',
      templateUrl: '/views/database/policiesForm.html'
    }).
    when('/database/policies/new', {
      controller: 'PoliciesFormCtrl',
      templateUrl: '/views/database/policiesForm.html'
    }).
    when('/database/ripple_addresses', {
      controller: 'RippleAddressesCtrl',
      templateUrl: '/views/database/rippleAddresses.html'
    }).
    when('/database/ripple_addresses/:id/update', {
      controller: 'RippleAddressesFormCtrl',
      templateUrl: '/views/database/rippleAddressesForm.html'
    }).
    when('/database/ripple_addresses/new', {
      controller: 'RippleAddressesFormCtrl',
      templateUrl: '/views/database/rippleAddressesForm.html'
    }).
    when('/database/ripple_transactions', {
      controller: 'RippleTransactionsCtrl',
      templateUrl: '/views/database/rippleTransactions.html'
    }).
    when('/database/ripple_transactions/:id/update', {
      controller: 'RippleTransactionsFormCtrl',
      templateUrl: '/views/database/rippleTransactionsForm.html'
    }).
    when('/database/ripple_transactions/new', {
      controller: 'RippleTransactionsFormCtrl',
      templateUrl: '/views/database/rippleTransactionsForm.html'
    }).
    when('/database/users', {
      controller: 'UsersCtrl',
      templateUrl: '/views/database/users.html'
    }).
    when('/database/users/:id/update', {
      controller: 'UsersFormCtrl',
      templateUrl: '/views/database/usersForm.html'
    }).
    when('/database/users/new', {
      controller: 'UsersFormCtrl',
      templateUrl: '/views/database/usersForm.html'
    }).
    when('/database/bridges', {
      controller: 'BridgesCtrl',
      templateUrl: '/views/database/bridges.html'
    }).
    when('/database/bridges/:id/update', {
      controller: 'BridgesFormCtrl',
      templateUrl: '/views/database/bridgesForm.html'
    }).
    when('/database/bridges/new', {
      controller: 'BridgesFormCtrl',
      templateUrl: '/views/database/bridgesForm.html'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }
]);
