app.controller('profilsUserCtrl', ['$scope', '$rootScope', 'AuthService', '$state', '$window',
 function($scope, $rootScope, AuthService, $state, $window) {
  $scope.member = AuthService.user();
  $scope.showEditProfilUser = false;

  $rootScope.getInfo = () => {
   AuthService.getInfo($scope.user).then(function(response){
     $scope.member = response.data.user;
     $scope.member === undefined ? $state.go('login') : $state.current;
   }).catch((errMsg) => {
       const alertPopup = $window.alert('show profil member failed!');
       $state.go('login');
     });
  };



  $rootScope.getInfo();

}]);
