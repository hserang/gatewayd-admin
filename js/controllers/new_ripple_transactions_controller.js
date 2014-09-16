rippleGatewayApp.controller('NewRippleTransactionsCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.transaction = {};

    $scope.createRippleTransaction = function() {
      $api.createRippleTransaction($scope.transaction, function(err, res) {
        if (!err) {
          $location.path('/database/ripple_transactions');
        }
      });
    };
}]);
