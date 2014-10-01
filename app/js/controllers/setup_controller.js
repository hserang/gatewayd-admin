rippleGatewayApp.controller('SetupCtrl', [
  '$scope', '$state', 'ApiService', 'UserService',
  function($scope, $state, $api, $user) {

    //pre-fill default options
    $scope.setup = {
      database_url: 'postgres://postgres:postgres@localhost:5432/ripple_gateway',
      ripple_rest_url: 'http://localhost:5990/',
      currencies: {}
    };

    $scope.setupResults = {};
    $scope.errors = {};
    $scope.errorsExist = false;
    $scope.setupComplete = false;
    $scope.isSubmitting = false;
    $scope.progressBar = 0;

    //TODO: enable issuing multiple currencies at a time in the future
    $scope.addCurrencies = function(currency, amount) {
      this.setup.currencies[currency] = amount;
      console.log(this.setup.currencies);
    };

    $scope.removeCurrency = function(currency) {
      delete this.currencies[currency];
    };

    $scope.postSetup = function() {
      $scope.isSubmitting = true;
      $scope.addCurrencies($scope.currency, $scope.amount);

      $scope.pollProgress();

      $api.setup({ config: $scope.setup }, function(error, response) {
        var error = error || null,
            errors;

        if (error) {
          $scope.errors = {};
          errors = error.errors;
          console.log('error.errors', errors);

          for (i in errors) {
            error = errors[i];
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

    $scope.pollProgress = function() {
      $api.setupStatus(function(error, response) {
        $scope.progressBar = response.progress;
      });

      setTimeout(function() {
        if (!$scope.setupComplete) {
          $scope.pollProgress();
        }
      }, 700);
    };

    $scope.launchGateway = function() {
        $user.login($scope.setupResults.results.admin_login.username,
        $scope.setupResults.results.admin_login.password,
        function(err, success) {
          if (err) {
            console.log('LOGIN ERR', err);
          } else {
            $api.launchGateway(function(err, success) {
              if (err) {
                console.log('launc err', err);
              } else {
                $state.go('login');
                console.log('started gateway', success);
              }
            });
          }
        });
    };

  }]);
