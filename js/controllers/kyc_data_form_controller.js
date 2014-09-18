rippleGatewayApp.controller('KycDataFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  'ApiService', function($scope, $user, $location, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.datum = {};

    $scope.createKycDatum = function() {
      $api.createKycDatum($scope.datum, function(err, res) {
        if (!err) {
          $location.path('/database/kyc_data');
        }
      });
    };
}]);
