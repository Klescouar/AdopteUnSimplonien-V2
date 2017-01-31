app.controller('loginCtrl', ['$scope', '$rootScope', 'AuthService', '$state','$window', '$rootScope',
 function($scope, $rootScope, AuthService, $state, $window, $rootScope) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.verifLogin = true;

    $scope.login = () => {
        AuthService.login($scope.user).then(function(response) {
            $rootScope.showLogout = true;
            if (response.status != 404) {
                if (response.data.user.role === 'Simplonien') {
                    $state.go('profilUserStudent');
                } else if(response.data.user.role === 'Recruteur') {
                    $state.go('profilUserRecruiter');
                } else if (response.data.user.role === 'Admin') {
                  $state.go('admin');
                }
                return response;
            }
            $state.go('profilUserStudent');
        }).catch(function(error) {
            $scope.verifLogin = false;
            $rootScope.showLogout = false;
            AuthService.clearLocalStorage();
            const alertPopup = $window.alert('Login failed!');
            $state.go('login');
        });
    };
 }]);
