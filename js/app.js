var rippleGatewayApp = angular.module('rippleGatewayApp', ['ui.router', 'restangular']);

rippleGatewayApp.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {
    "use strict";

    // this is a known evil. Will address api at a later date
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var key;

      for (key in data) {
        if (key === "success") {
          continue;
        }

        return data[key];
      }
    });

    RestangularProvider.setDefaultHttpFields({cache: true});
    $urlRouterProvider.otherwise("/login");

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('setup', {
        url: '/setup',
        controller: 'SetupCtrl',
        templateUrl: 'views/setup.html'
      })
      .state('register', {
        url: '/register',
        controller: 'RegistrationCtrl',
        templateUrl: 'views/register.html'
      })
      .state('overview', {
        url: '/overview',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/overview.html'
      })
      .state('deposits', {
        url: '/deposits',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/deposits.html'
      })
      .state('withdrawals', {
        url: '/withdrawals',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/withdrawals.html'
      })
      .state('users', {
        url: '/users',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin/users.html'
      })
      .state('account', {
        url: '/account',
        controller: 'UserCtrl',
        templateUrl: 'views/user/account.html'
      })
      .state('deposit', {
        url: '/deposit',
        controller: 'AccountCtrl',
        templateUrl: 'views/user/deposit.html'
      })
      .state('withdraw', {
        url: '/withdraw',
        controller: 'AccountCtrl',
        templateUrl: 'views/user/withdraw.html'
      })
      .state('database', {
        url: '/database',
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('database.external_accounts', {
        url: '/external_accounts',
        controller: 'ExternalAccountsCtrl',
        templateUrl: '/views/database/externalAccounts.html'
      })
        .state('database.external_accounts.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/externalAccountsForm.html'
            }
          }
        })
        .state('database.external_accounts.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/externalAccountsForm.html'
            }
          }
        })
      .state('database.external_transactions', {
        url: '/external_transactions',
        controller: 'ExternalTransactionsCtrl',
        templateUrl: '/views/database/externalTransactions.html'
      })
        .state('database.external_transactions.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/externalTransactionsForm.html'
            }
          }
        })
        .state('database.external_transactions.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/externalTransactionsForm.html'
            }
          }
        })
      .state('database.gateway_transactions', {
        url: '/gateway_transactions',
        controller: 'GatewayTransactionsCtrl',
        templateUrl: '/views/database/gatewayTransactions.html'
      })
        .state('database.gateway_transactions.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/gatewayTransactionsForm.html'
            }
          }
        })
        .state('database.gateway_transactions.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/gatewayTransactionsForm.html'
            }
          }
        })
      .state('database.kyc_data', {
        url: '/kyc_data',
        controller: 'KycDataCtrl',
        templateUrl: '/views/database/kycData.html'
      })
        .state('database.kyc_data.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/kycDataForm.html'
            }
          }
        })
        .state('database.kyc_data.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/kycDataForm.html'
            }
          }
        })
      .state('database.policies', {
        url: '/database/policies',
        controller: 'PoliciesCtrl',
        templateUrl: '/views/database/policies.html'
      })
        .state('database.policies.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/policiesForm.html'
            }
          }
        })
        .state('database.policies.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/policiesForm.html'
            }
          }
        })
      .state('database.ripple_addresses', {
        url: '/ripple_addresses',
        controller: 'RippleAddressesCtrl',
        templateUrl: '/views/database/rippleAddresses.html'
      })
        .state('database.ripple_addresses.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/rippleAddressesForm.html'
            }
          }
        })
        .state('database.ripple_addresses.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/rippleAddressesForm.html'
            }
          }
        })
      .state('database.ripple_transactions', {
        url: '/ripple_transactions',
        controller: 'RippleTransactionsCtrl',
        templateUrl: '/views/database/rippleTransactions.html'
      })
        .state('database.ripple_transactions.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/rippleTransactionsForm.html'
            }
          }
        })
        .state('database.ripple_transactions.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/rippleTransactionsForm.html'
            }
          }
        })
      .state('database.users', {
        url: '/users',
        controller: 'UsersCtrl',
        templateUrl: '/views/database/users.html'
      })
        .state('database.users.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/usersForm.html'
            }
          }
        })
        .state('database.users.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/usersForm.html'
            }
          }
        })
      .state('database.bridges', {
        url: '/bridges',
        controller: 'BridgesCtrl',
        templateUrl: '/views/database/bridges.html'
      })
        .state('database.bridges.new', {
          views: {
            "child-view": {
              templateUrl: '/views/database/bridgesForm.html'
            }
          }
        })
        .state('database.bridges.update', {
          views: {
            "child-view": {
              templateUrl: '/views/database/bridgesForm.html'
            }
          }
        });
  }
]);
