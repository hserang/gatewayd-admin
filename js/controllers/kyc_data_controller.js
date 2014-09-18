rippleGatewayApp.controller('KycDataCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService',
  '$window', function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.data = [];

    $api.getKycData(function(err, res) {
      if (!err) {
        $scope.data = res.kyc_data;
      }
    });

    $scope.deleteKycDatum = function(index) {
      var datum = $scope.data[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteKycDatum(datum.id, function(err, res) {
          if (!err) {
            $scope.data.splice(index, 1);
          }
        });
      }
    };

    $scope.updateKycDatum = function(index) {
      $location.path('/database/kyc_data/' + index + '/update');
    };
}]);
