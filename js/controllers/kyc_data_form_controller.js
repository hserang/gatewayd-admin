rippleGatewayApp.controller('KycDataFormCtrl', [
  '$scope',
  'UserService',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.datum = {};

    if ($routeParams.id) {
      $scope.new = false;

      $api.getKycDatum($routeParams.id, function(err, res) {
        console.log(res);
        if (!err && res.success) {
          $scope.datum = res.datum;
        }
      });
    } else {
      $scope.new = true;
    }

    $scope.createKycDatum = function() {
      $api.createKycDatum($scope.datum, function(err, res) {
        if (!err) {
          $location.path('/database/kyc_data');
        }
      });
    };
}]);
