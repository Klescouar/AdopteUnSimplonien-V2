app.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'evalShopAppTokenKey';
  var isAuthenticated = false;
  var authToken;
  var role = '';


  var serializedCurrentAnnonce;

  var clearLocalStorage = function(){
   localStorage.clear(serializedCurrentAnnonce);
  }

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var constantUser = {};
  var constantUserRole = {};
  var testLocalStorage;

  var getConstantUser = function(){
   constantUser = JSON.parse(localStorage.getItem('user'));
   return constantUser;
  }

  var setConstantUser = function(user){
   constantUser = user;
  }

  var getConstantUserRole = function(){
   constantUserRole = localStorage.getItem('userRole');
   return constantUserRole;
  }

  var register = function(user) {
      return $http.post(API_ENDPOINT.url + '/signup', user).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  };

  var login = function(user) {
     return $http.post(API_ENDPOINT.url + '/authenticate', user).then(
      function(response){
       storeUserCredentials(response.data.token);
       constantUser = localStorage.setItem('user', angular.toJson(response.data.user));
       testLocalStorage = localStorage.setItem('userRole', response.data.user.role);
       return response;
      }, function(error){
       return error;
      }
     );
  };

  var getInfo = function(user) {
   return $http.get(API_ENDPOINT.url + '/memberinfo').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  var getAllUser = function(user) {
   return $http.get(API_ENDPOINT.url + '/users').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  var removeFromAdmin = function(user) {
    return $http.delete(API_ENDPOINT.url + '/memberinfo/delete', user ).then(
      function(response){
       return response;
      }, function(error){
       return error;
      }
   );
};

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    user: getConstantUser,
    setUser: setConstantUser,
    userRole: getConstantUserRole,
    loadUserCredentials: loadUserCredentials,
    login: login,
    register: register,
    getInfo: getInfo,
    getAllUser: getAllUser,
    logout: logout,
    clearLocalStorage: clearLocalStorage,
    removeFromAdmin: removeFromAdmin,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
