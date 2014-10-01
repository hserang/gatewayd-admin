rippleGatewayApp.controller('AccountCtrl', [
    '$scope', '$http', 'ApiService', 'UserService', '$state',
    function($scope, $http, $api, $user, $state) {

  if (!$user.isLogged) {
    $state.go('login');
  }

  var userId = $user.id;

  $scope.loading = true;
  $scope.externalTransactions = [];
  $scope.rippleTransactions = [];
  $api.getUserExternalTransactions(userId, function(err, transactions) {
    $scope.loading = false;
    $scope.externalTransactions = transactions;
  });

  $api.getUserRippleTransactions(userId, function(err, transactions) {
    $scope.loading = false;
    $scope.rippleTransactions = transactions;
  });

  $scope.withdrawAddress = [];
  function getUserWithdrawalAddress(fn) {
    $http({ method: 'GET', url: "/v1/users/"+$user.id+"/ripple_addresses" })
    .success(function(response, status, headers, config) {
      var rippleAddresses = response.rippleAddresses,
          hostedAddress, address;

      if (rippleAddresses) {
        hostedAddress = null;

        for (var i=0; i<rippleAddresses.length; i++) {
          address = rippleAddresses[i];
          console.log(address);

          if (!hostedAddress && address.type == "hosted") {
            hostedAddress = address;
          }
        }

        fn(null, hostedAddress);
      }

      $('.throbber').hide();
    })
    .error(function(data, status, headers, config) {
      fn(data, null);
      console.log('error:', data);
      $('.throbber').hide();
    });
  }

  getUserWithdrawalAddress(function(err, address){
    console.log(err, address);
    $scope.withdrawAddress = address;
  });
}]);
