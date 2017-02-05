app.controller('loginCtrl', ['$scope', '$rootScope', 'AuthService', '$state','$window', '$rootScope', 'serviceMailer', '$stateParams',
 function($scope, $rootScope, AuthService, $state, $window, $rootScope, serviceMailer, $stateParams) {
    $scope.user = {
        email: '',
        password: ''
    };

    if (typeof $stateParams.token !== 'undefined') {
        AuthService.confirmMail($stateParams.token).then(function(res) {
            if (res.data.msg === 'Erreur') {
                alert('error')
            } else {
                alert('compte validé')
            }
        })
    }

    $scope.verifLogin = true;

    $scope.login = () => {
        AuthService.login($scope.user).then(function(response) {
            $rootScope.userRole = AuthService.userRole();
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
            $rootScope.userRole = AuthService.userRole();
            AuthService.clearLocalStorage();
            const alertPopup = $window.alert('Login failed!');
            $state.go('login');
        });
    };
 }]);
