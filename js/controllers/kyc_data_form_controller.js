rippleGatewayApp.controller('KycDataFormCtrl', [
  '$scope',
  'UserService',
  '$timeout',
  '$location',
  '$routeParams',
  'ApiService', function($scope, $user, $timeout, $location, $routeParams, $api) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.datum = {};
    $scope.messageState = '';

    if ($routeParams.id) {
      $scope.creating = false;

      $api.getKycDatum($routeParams.id, function(err, res) {
        if (!err) {
          $scope.datum = res.data;
        }
      });
    } else {
      $scope.creating = true;
    }

    $scope.updateKycDatum = function() {
      $api.updateKycDatum($routeParams.id, $scope.datum, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'KYC Data updated.';

          $timeout(function() {
            $location.path('/database/kyc_data');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };

    $scope.createKycDatum = function() {
      $api.createKycDatum($scope.datum, function(err, res) {
        if (!err) {
          $scope.messageState = 'success';
          $scope.successMessage = 'KYC Data updated.';

          $timeout(function() {
            $location.path('/database/kyc_data');
          }, 1000);
        } else {
          $scope.messageState = 'error';
          $scope.errorMessage = $api.constructErrorMessage(err).join(', ');
        }
      });
    };
}]);
