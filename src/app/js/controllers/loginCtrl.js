app.controller('loginCtrl', ['$scope', '$rootScope', 'AuthService', '$state','$window', 'serviceMailer', '$stateParams','$timeout',
 function($scope, $rootScope, AuthService, $state, $window, serviceMailer, $stateParams,$timeout) {
    $scope.acountState = true;
    $scope.emailVerified = false;
    $scope.verifLogin = true;
    $scope.input = true;
    $scope.user = {
        email: '',
        password: '',
    };

    if (typeof $stateParams.token !== 'undefined') {
        AuthService.confirmMail($stateParams.token).then(function(res) {
            if (res.data.msg === 'Erreur') {
                alert('error')
            } else {
              $scope.emailVerified = true;
            $timeout(function () {
              $scope.emailVerified = false;
                }, 6000);
              $scope.acountState = true;
            }
        })
    }

    $scope.login = () => {
        $scope.input = true;
        if ($scope.user.email != ''&& $scope.user.password != '' ) {
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
                  $state.go('admin.home');
                }
                return response;
            }
            $state.go('profilUserStudent');
          }else if (response.data.msg === 'Authentication failed. Inactive account.') {
            $scope.acountState = false;
              $timeout(function () {
              $scope.acountState = true;
                }, 6000);
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
      }else{
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                $scope.input=false;
            }
    }
}

 }]);
