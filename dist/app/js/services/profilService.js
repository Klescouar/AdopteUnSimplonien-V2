app.service('ProfilService', function($q, $http, API_ENDPOINT) {

 var constantUserprofil = {};
 var testLocalStorage;
 var serializedCurrentProfil;

 var getConstantUserProfil = function(){
   serializedCurrentProfil  = localStorage.getItem('userProfil');
   constantUserProfil       = JSON.parse(serializedCurrentProfil);
   return constantUserProfil;
 }

 var clearLocalStorage = function(){
  localStorage.clear(serializedCurrentProfil);
 }


  var getInfoProfil = function(user_id) {
   return $http.get(API_ENDPOINT.url + '/memberinfo/profil/' +  user_id ).then(
    function(response) {
     var serializedPreferences = JSON.stringify(response.data.Profil);
     testLocalStorage = localStorage.setItem('userProfil', serializedPreferences );
     return response;
    }, function(error){
     return error;
    }
   );
  }

  return {
   getInfoProfil: getInfoProfil,
   UserProfil: getConstantUserProfil,
   clearLocalStorage: clearLocalStorage
  }

});
