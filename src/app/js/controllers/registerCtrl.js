app.controller('registerCtrl', ['$scope', 'AuthService', '$state', '$window', '$timeout', '$location', function($scope, AuthService, $state, $window, $timeout,$location, $stateProvider,$urlRouterProvider) {

        $scope.verifPass = true;
        $scope.passLength = true;
        $scope.borderClass = true;

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
          console.log( $scope.passwordCheckedRecruteur)
          console.log($scope.userRecruteur.password)
            if ($scope.userRecruteur.password.trim().length >= 8) {
                if ($scope.userRecruteur.password === $scope.passwordCheckedRecruteur) {
                  AuthService.register($scope.userRecruteur).then(function(response) {
                      console.log(response)
                      if (response.data.success === 'true') {
                        $state.go('login');
                      }
                      const alertPopup = $window.alert(response.data.msg);
                    }).catch(function(errMsg) {
                        const alertPopup = $window.alert('Fail!!');
                    });
                } else if ($scope.userRecruteur.password !== $scope.passwordCheckedRecruteur) {
                    $scope.verifPass = false;
                }
            } else if ($scope.userRecruteur.password.length < 8 && $scope.userRecruteur.password.length > 0) {
                $scope.passLength = false;
            }
        };

        $scope.registerSimplonien = () => {
            if ($scope.userSimplonien.password.length.trim() >= 8) {
                console.log("coucou")
                if ($scope.user.password === $scope.passwordChecked) {
                    AuthService.register($scope.userSimplonien).then(function(response) {
                        console.log(response)
                        if (response.data.success === 'true') {
                          $state.go('login');
                        }
                        const alertPopup = $window.alert(response.data.msg);
                    }).catch(function(errMsg) {
                        const alertPopup = $window.alert(response.data.msg);
                    });
                } else if ($scope.userSimplonien.password !== $scope.passwordCheckedSimplonien) {
                    $scope.verifPass = false;
                }
            } else if ($scope.userSimplonien.password.length < 8 && $scope.userSimplonien.password.length > 0) {
                $scope.passLength = false;
            }
        };



        $scope.SetStyle = function(role) {
            $scope.passLength = true;
            $scope.verifPass = true;
          $scope.user.role = role;

            if ($scope.user.role == "Recruteur") {
                console.log($scope.user.role)
                $scope.changeStatus = 'Recruteur';
                $scope.borderClass = true;
                console.log($scope.borderClass)
            } else if ($scope.user.role == "Simplonien") {
                console.log($scope.user.role)
                $scope.changeStatus = 'Simplonien';
                $scope.borderClass = false;

            }
        }
    }
]);
