app.controller('appUserCtrl', ['$scope', '$rootScope', '$state', 'AuthService', 'AUTH_EVENTS','$window',
 function($scope, $rootScope, $state, AuthService, AUTH_EVENTS, $window) {

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    const alertPopup = $window.alert( 'Sorry, You have to login again.');
  });

  if (AuthService.userRole()) {
    $rootScope.showLogout = true;
  }

  $scope.logout = function() {
   $rootScope.showLogout = false;
    AuthService.logout();
    AuthService.clearLocalStorage();
    $state.go('home');
    $scope.isHome = true;
  };


}]);
