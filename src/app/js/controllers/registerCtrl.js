app.controller('registerCtrl', ['$scope', 'AuthService', '$state', '$window', '$timeout', '$location', function($scope, AuthService, $state, $window, $timeout,$location, $stateProvider,$urlRouterProvider) {

        $scope.borderClass = true;
        $scope.passwordCheckedSimplonien='';
        $scope.passwordCheckedRecruteur='';
        $scope.email=true;
        $scope.user= {
            role: 'Recruteur'
        };
        $scope.userRecruteur = {
            company: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Recruteur'
        };
        $scope.userSimplonien = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Simplonien'
        };

        $scope.registerRecruteur = () => {
            if ($scope.userRecruteur.password.trim().length >= 8) {
                if ($scope.userRecruteur.password === $scope.passwordCheckedRecruteur) {
                  AuthService.register($scope.userRecruteur).then(function(response) {
                    if (response.data.msg === "Email already used") {
                        $scope.email=false;
                        const alertPopup = $window.alert(response.data.msg);
                    }else {
                            $scope.email=true;
                            $state.go('login');
                    }
                    }).catch(function(errMsg) {
                        const alertPopup = $window.alert('Fail!!');
                    });
                }
            }
        };

        $scope.registerSimplonien = () => {
            if ($scope.userSimplonien.password.trim().length >= 8) {
                if ($scope.user.password === $scope.passwordChecked) {
                    AuthService.register($scope.userSimplonien).then(function(response) {
                    if (response.data.msg === "Email already used") {
                        $scope.email=false;
                        const alertPopup = $window.alert(response.data.msg);
                    }else {
                            $scope.email=true;
                            $state.go('login');
                    }
                    }).catch(function(errMsg) {
                        const alertPopup = $window.alert("Fail!");
                    });
                }
            }
        };

        $scope.SetStyle = function(role) {
          $scope.user.role = role;
            if ($scope.user.role == "Recruteur") {
                $scope.changeStatus = 'Recruteur';
                $scope.borderClass = true;
            } else if ($scope.user.role == "Simplonien") {
                $scope.changeStatus = 'Simplonien';
                $scope.borderClass = false;
            }
        }
    }
]);
