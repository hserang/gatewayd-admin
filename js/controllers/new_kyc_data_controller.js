rippleGatewayApp.controller('NewKycDataCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.data = {};

    $scope.createKycData = function() {
      $api.createKycData($scope.data, function(err, res) {
        if (!err) {
          $location.path('/database/kyc_data');
        }
      });
    };
}]);
