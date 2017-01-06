app.controller('registerCtrl', [
    '$scope',
    'AuthService',
    '$state',
    '$window',
    '$timeout',
    function($scope, AuthService, $state, $window, $timeout) {
        $scope.user = {
            company: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Recruteur'
        };

        

        $scope.signup = () => {
          console.log($scope.user)
            AuthService.register($scope.user).then(function(response) {
                $state.go('login');
                const alertPopup = $window.alert('Register success!');
                console.log($scope.user.firstName)
            }).catch(function(errMsg) {
                const alertPopup = $window.alert('Fail!!');
            });
        };

        $scope.borderClass = true;

        $scope.SetStyle = function(role) {
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
