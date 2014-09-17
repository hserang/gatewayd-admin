rippleGatewayApp.controller('KycDataCtrl', [
  '$scope',
  'UserService',
  'ApiService',
  '$window', function($scope, $user, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.data = [];

    $api.getKycData(function(err, res) {
      if (!err) {
        $scope.data = res.kyc_data;
      }
    });

    $scope.deleteKycData = function(index) {
      var data = $scope.data[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteKycData(data.id, function(err, res) {
          if (!err) {
            $scope.data.splice(index, 1);
          }
        });
      }
    };
}]);
