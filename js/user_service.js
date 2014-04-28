rippleGatewayApp.service('UserService', ['$http', '$location', function($http, $location) {
  function registerUser(opts, fn) {
    $http({ method: "POST", url: '/v1/register/', data: opts })
    .success(function(response, status, headers, config) {
      fn(null, response.user);
    })
    .error(function(data, status, headers, config) {
      fn(data, null);
    });
  }

  function loginUser(opts, fn) {
    $http({ method: "POST", url: '/v1/users/login', data: opts })
    .success(function(response, status, headers, config) {
      fn(null, response.user);
    })
    .error(function(data, status, headers, config) {
      fn(data, null);
    });
  }

  var user = { 
    name: "",
    password: "",
    id: "",
    isLogged: false,
    isAdmin: false,
    login: function(name, password, fn) {
      loginUser({ name: name, password: password }, fn);
    },
    logout: function(fn) {
      user.name = "";
      user.password = "";
      user.id = "";
      user.isLogged = false;
      user.isAdmin = false;
      $location.path("/login");
    },
    register: function(opts, fn){
      registerUser({
        name: opts.name,
        password: opts.password,
        ripple_address: opts.ripple_address
      }, fn);
    }
  };
  return user;
}]);

