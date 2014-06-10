rippleGatewayApp.controller('SetupCtrl', [
  '$scope',
  '$location',
  'ApiService', function($scope, $location, $api) {

  $scope.setup = {}
  $scope.errors = {};
  $scope.errorsExist = false;
  $scope.setupComplete = false;

  $scope.postSetup = function(){

    $scope.setup.currencies = {};
    $scope.setup.currencies[$scope.setup.currency] = 10;

    $api.setup({ config: $scope.setup }, function(error, response){

      if (error) {
        $scope.errors = {};
        var errors = error.errors;
        console.log('error.errors', errors);
        for (i in errors) {
          var error = errors[i];
          console.log('ERROR', error);
          $scope.errors[error.field] = error.message;
        }
        $scope.errorsExist = true;
        console.log('ERROR', error); 
      } else {
        console.log('RESPONSE', response);
        $scope.setupComplete = true; 
      }
    });
  }

}]);

