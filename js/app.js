var rippleGatewayApp = angular.module('rippleGatewayApp', [
  'ngRoute'
]);

rippleGatewayApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/admin', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/index.html'
    }).
    when('/account', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin.html'
    }).
    when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'views/login.html'
    }).
    when('/register', {
      controller: 'RegistrationCtrl',
      templateUrl: 'views/register.html'
    }).
    when('/deposits', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/deposits.html'
    }).
    when('/payments/outgoing', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/outgoing_payments.html'
    }).
    when('/payments/incoming', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/incoming_payments.html'
    }).
    when('/withdrawals', {
      controller: 'AdminCtrl',
      templateUrl: 'views/admin/withdrawals.html'
    }).
    when('/users', {
      controller: 'UsersCtrl',
      templateUrl: 'views/users.html'
    }).
    when('/users/:id', {
      controller: 'UserCtrl',
      templateUrl: 'views/user.html'
    }).
    when('/account', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user.html'
    }).
    when('/deposit', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/deposit.html'
    }).
    when('/withdraw', {
      controller: 'AccountCtrl',
      templateUrl: 'views/user/withdraw.html'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }
]);
