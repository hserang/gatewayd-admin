rippleGatewayApp.controller('SetupCtrl', [
  '$scope',
  '$location',
  'ApiService',
  'UserService',
  function($scope, $location, $api, $user) {
  //pre-fill default options
  $scope.setup = {
    database_url: 'postgres://postgres:postgres@localhost:5432/ripple_gateway',
    ripple_rest_url: 'http://localhost:5990/'
  };
  $scope.setupResults = {};
  $scope.errors = {};
  $scope.errorsExist = false;
  $scope.setupComplete = false;
  $scope.isSubmitting = false;
  $scope.progressBar = 0;
  $scope.setup.currencies = {};

  $scope.addMoreCurrencies = function(currency, amount){
    this.setup.currencies[currency] = amount;
    $scope.amount = null;
    $scope.currency = null;
  };

  $scope.removeCurrency = function(currency){
    delete this.setup.currencies[currency];
  };

  $scope.postSetup = function(){
    $scope.isSubmitting = true;
    $scope.pollProgress();
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

    $scope.pollProgress = function(){
      $api.setupStatus(function(error, response){
        $scope.progressBar = response.progress;
      });
      setTimeout(function(){
        $scope.pollProgress();
      }, 700);
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

  window.setup = $scope.setup;


}]);

