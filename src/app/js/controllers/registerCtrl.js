app.controller('registerCtrl', ['$scope', 'AuthService', 'serviceFilter','$state', '$window', '$timeout', '$location', function($scope, AuthService, serviceFilter,$state, $window, $timeout,$location, $stateProvider,$urlRouterProvider) {

        $scope.borderClass = true;
        $scope.passwordCheckedSimplonien='';
        $scope.passwordCheckedRecruteur='';
        $scope.email=true;
        // $scope.userSimplonienArray =[$scope.lastName];
        $scope.input=true;
        $scope.checkInput= $('.input-register').val();
        $scope.user= {
            role: 'Recruteur'
        };
        $scope.userRecruteur = {
            technology:'',
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
            // $scope.userSimplonienArray.forEach(val => {
            //     console.log("coucou")
            //     if ($scope.userSimplonienArray[val] === '') 
            //         console.log("couocu")
            //         return 'Veuillez remplir le champ'
            // })
            // if ($scope.checkInput !=="") {
                // $scope.input=true;
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
            //}
            // else{
            //     $scope.input=false;
            // }
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
      $scope.getAllSkill = () => {
          serviceFilter.getAllSkill().then(function(response) {
              $scope.skills = response.data;
          }).catch(function(errMsg) {
              console.log('show skill failed!');
          });
      }
      $scope.getAllSkill();

    }
]);
