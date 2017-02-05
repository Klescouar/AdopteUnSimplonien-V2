app.service('AuthService', function($q, $http, API_ENDPOINT) {
  let LOCAL_TOKEN_KEY = 'AdopteAppTokenKey';
  let isAuthenticated = false;
  let authToken;
  let role = '';


  let serializedCurrentAnnonce;

  const clearLocalStorage = () => {
   localStorage.clear(serializedCurrentAnnonce);
  }

  function loadUserCredentials() {
    const token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
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

  let constantUser = {};
  let constantUserRole = {};
  let testLocalStorage;

  const getConstantUser = () => {
   constantUser = JSON.parse(localStorage.getItem('user'));
   return constantUser;
  }

  const setConstantUser = (user) => {
   constantUser = user;
  }

  const getConstantUserRole = () => {
   constantUserRole = localStorage.getItem('userRole');
   return constantUserRole;
  }

  const login = (user) => {
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

  const updateUser = (id, newInfos) => {
      return $http.put(API_ENDPOINT.url + '/update/user/' + id, newInfos).then(
       function(response){
         constantUser = localStorage.setItem('user', angular.toJson(response.data));
        return response;
       }, function(error){
        return error;
       }
      );
  };

  const createToken = (mail) => {
      return $http.get(API_ENDPOINT.url + '/createToken/' + mail).then(function(response) {
        const dataUser = {token: response.data, mail: mail};
        constantUser = localStorage.setItem('user', angular.toJson(dataUser));
          return response;
      }, function(error) {
          return error;
      });
  };

  const updateUserPassFromProfil = (id, newInfos) => {
      return $http.put(API_ENDPOINT.url + '/update/pass/profil/' + id, newInfos).then(function(response) {
          return response;
      }, function(error) {
          return error;
      });
  };

  const resetUserPass = (data, pass) => {
      return $http.put(API_ENDPOINT.url + '/update/pass/reset', {data, pass}).then(function(response) {
          return response;
      }, function(error) {
          return error;
      });
  };

  const register = (user) => {
      return $http.post(API_ENDPOINT.url + '/signup', user).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  };

  const confirmMail = (token) => {
      let data = {token: token};
      return $http.post(API_ENDPOINT.url + '/valid/mail', data).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  }

  const getInfo = (user) => {
   return $http.get(API_ENDPOINT.url + '/memberinfo').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  const getAllUser = (user) => {
   return $http.get(API_ENDPOINT.url + '/users').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  const removeFromAdmin = (id) => {
    return $http.delete(API_ENDPOINT.url + '/memberinfo/delete/' + id).then(
      function(response){
       return response;
      }, function(error){
       return error;
      }
   );
};

  const logout = () => {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    updateUserPassFromProfil : updateUserPassFromProfil,
    resetUserPass : resetUserPass,
    createToken: createToken,
    updateUser : updateUser,
    user: getConstantUser,
    setUser: setConstantUser,
    userRole: getConstantUserRole,
    loadUserCredentials: loadUserCredentials,
    login: login,
    confirmMail: confirmMail,
    register: register,
    getInfo: getInfo,
    getAllUser: getAllUser,
    logout: logout,
    clearLocalStorage: clearLocalStorage,
    removeFromAdmin: removeFromAdmin,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
