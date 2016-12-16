app.controller('profilsUserCtrl', ['$scope', '$rootScope', 'AuthService', '$state', '$window',
 function($scope, $rootScope, AuthService, $state, $window) {
  $scope.member = AuthService.user();
  $scope.showEditProfilUser = false;

  $rootScope.getInfo = function() {
   AuthService.getInfo($scope.user).then(function(response){
     $scope.member = response.data.user;
     }).catch(function(errMsg) {
       const alertPopup = $window.alert('show profil member failed!');
     });
  };



  $rootScope.getInfo();

}]);
