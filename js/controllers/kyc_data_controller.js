rippleGatewayApp.controller('KycDataCtrl', [
  '$scope',
  'UserService',
  'ApiService', function($scope, $user, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.data = [];

    $api.getKycData(function(err, res) {
      if (!err) {
        $scope.data = res.kyc_data;
      }
    });
}]);
