app.controller('appUserCtrl', ['$scope', '$rootScope', '$state', 'AuthService', 'AUTH_EVENTS','$window',
 function($scope, $rootScope, $state, AuthService, AUTH_EVENTS, $window) {

    $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
        AuthService.logout();
        $state.go('login');
    });

    if (AuthService.userRole()) {
        $rootScope.userRole = AuthService.userRole();
    }

    if (AuthService.userRole()) {
        $rootScope.showLogout = true;
    }

    $scope.logout = () => {
        $rootScope.showLogout = false;
        AuthService.logout();
        AuthService.clearLocalStorage();
        $scope.isHome = true;
    };


}]);
