app.controller('loginCtrl', ['$scope', '$rootScope', 'AuthService', '$state','$window', '$rootScope',
 function($scope, $rootScope, AuthService, $state, $window, $rootScope) {
  $scope.user = {
    email: '',
    password: ''
  };

$scope.verifLogin = true;

  $scope.login = () => {
    AuthService.login($scope.user).then(function(response){
     $rootScope.showLogout = true;
     if (response.status != 404) {
      if (response.data.user.role != 'Admin') {
       $state.go('home');
      }
      else{
       $state.go('admin');
       return response;
      }
     }
      $state.go('profilUser');
    }).catch(function(error){
      $scope.verifLogin = false;
      console.log($scope.verifLogin)
      $rootScope.showLogout = false;
       AuthService.clearLocalStorage();
      const alertPopup = $window.alert('Login failed!');
       $state.go('login');
    });
  };
 }]);
