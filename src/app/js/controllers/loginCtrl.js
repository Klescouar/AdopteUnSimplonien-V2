app.controller('loginCtrl', ['$scope', '$rootScope', 'AuthService', '$state','$window', 'serviceMailer', '$stateParams',
 function($scope, $rootScope, AuthService, $state, $window, serviceMailer, $stateParams) {
    $scope.acountState = true;
    $scope.user = {
        email: '',
        password: '',
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
            $scope.acountState = true;
            $scope.verifLogin = true;
          if (response.data.success === true) {
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
          }else if (response.data.msg === 'Authentication failed. Inactive account.') {
            $scope.acountState = false;
          }else{
            $scope.verifLogin = false;
          } 

        }).catch(function(error) {
            $scope.verifLogin = false;
            $rootScope.showLogout = false;
            $rootScope.userRole = AuthService.userRole();
            AuthService.clearLocalStorage();
            console.log(error)
            const alertPopup = $window.alert('Login failed!');
            $state.go('login');
        });
    };
 }]);
