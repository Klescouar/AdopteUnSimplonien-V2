app.controller('registerCtrl', [
    '$scope',
    'AuthService',
    '$state',
    '$window',
    '$timeout',
    '$location',
    function($scope, AuthService, $state, $window, $timeout,$location, $stateProvider,$urlRouterProvider) {
        $scope.user = {
            company: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Recruteur'
        };

        $scope.verifPass = true;
        $scope.passLength = true;

        $scope.signup = () => {

         if ($scope.user.password.length>=8 && $scope.user.company !="" && $scope.user.firstName !="" && $scope.user.lastName !="" && $scope.user.email !="" && $scope.user.password !="") { 
            console.log("coucou")
            if($scope.user.password === $scope.passwordChecked){
                AuthService.register($scope.user).then(function(response) {
                    console.log($scope.user.company)
                    $state.go('login');
                    const alertPopup = $window.alert('Register success!');
                    }).catch(function(errMsg) {  
                    const alertPopup = $window.alert('Fail!!');
             });
            } else if($scope.user.password !== $scope.passwordChecked){
                $scope.verifPass = false;                        
            }
        }else if($scope.user.password.length<8 && $scope.user.password.length>0){
            $scope.passLength = false;
        }
        
        };

        $scope.borderClass = true;

        $scope.SetStyle = function(role) {
            $scope.user.email ="";
            $scope.user.firstName ="";
            $scope.user.lastName="";
            $scope.user.password ="";
            $scope.passwordChecked="";
            $scope.passLength = true;
            $scope.verifPass = true;
          $scope.user.role = role;
          console.log($scope.user.role)
            if ($scope.user.role === "Recruteur") {
                $scope.changeStatus = 'Recruteur';
                $scope.borderClass = true;
            } else if ($scope.user.role === "Simplonien") {
                $scope.changeStatus = 'Simplonien';
                $scope.borderClass = false;

            }
        }
    }
]);
