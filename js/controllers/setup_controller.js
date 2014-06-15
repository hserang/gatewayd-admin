rippleGatewayApp.controller('SetupCtrl', [
  '$scope',
  '$location',
  'ApiService',
  'UserService',
  function($scope, $location, $api, $user) {

  $scope.setup = {};
  $scope.setupResults = {};
  $scope.errors = {};
  $scope.errorsExist = false;
  $scope.setupComplete = false;
  $scope.isSubmitting = false;
  console.log($scope.setup);
  $scope.postSetup = function(){
    $scope.isSubmitting = true;

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
        $scope.isSubmitting = false;
        console.log('ERROR', error); 
      } else {
        console.log('RESPONSE', response);
        $scope.setupResults = response;
        $scope.setupComplete = true;
        $scope.isSubmitting = false;
      }
    });
  };

  $scope.launchGateway = function(){
    $user.login($scope.setupResults.results.admin_login.username, $scope.setupResults.results.admin_login.password, function(err, success){
      if(err){
        console.log('LOGIN ERR', err);
      } else {
        $api.launchGateway(function(err, success){
          if(err){
            console.log('launc err', err);
          } else {
            $location.path('/login');
            console.log('started gateway', success);
          }
        });
      }
    });
  };

}]);

