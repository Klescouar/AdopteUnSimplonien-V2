app.controller('adminCtrl', ['$scope','$rootScope','AuthService', '$state','$window',
 function($scope, $rootScope, AuthService, $state, $window) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  $scope.showEditProfilUserAdmin = false;

  $scope.logout = function() {
    $rootScope.showLogout = false;
    AuthService.clearLocalStorage();
    AuthService.logout();
    $state.go('home');
    $scope.isHome = true;
  };


  $scope.signup = function() {
    AuthService.register($scope.user).then(function(response) {
      $state.go('admin.profils');
      const alertPopup = $window.alert('Register success!');
    }).catch(function(errMsg) {
      const alertPopup = $window.alert('Register failed!');
    });
  };


 }]);
