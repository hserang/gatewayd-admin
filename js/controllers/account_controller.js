rippleGatewayApp.controller('AccountCtrl', [
  '$scope', 
  '$http', 
  '$location', 
  'UserService', function($scope, $http, $location, $user){
  
  if (!$user.isLogged) {  $location.path('/login') };
  if ($user.isAdmin) {  $location.path('/admin') };

  var userId = $user.id;
  $scope.loading = true;  
  $scope.externalTransactions = [];
  $scope.rippleTransactions = [];
  getUserExternalTransactions($http, userId, function(err, transactions) {
    $scope.loading = false;
    $scope.externalTransactions = transactions;
  });

  getUserRippleTransactions($http, userId, function(err, transactions) {
    $scope.loading = false;
    $scope.rippleTransactions = transactions;
  });

  $scope.withdrawAddress = [];
  function getUserWithdrawalAddress(fn) {
    console.log('getUserWithdrawalAddress');
    $http({ method: 'GET', url: "/v1/users/"+$user.id+"/ripple_addresses" })  
    .success(function(response, status, headers, config) {
      var rippleAddresses = response.rippleAddresses;
      if (rippleAddresses) {
        var hostedAddress = null;  
        for (var i=0; i<rippleAddresses.length; i++) {
          var address = rippleAddresses[i];
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
  };

  getUserWithdrawalAddress(function(err, address){
    console.log(err, address);
    $scope.withdrawAddress = address;
  });

}]);

