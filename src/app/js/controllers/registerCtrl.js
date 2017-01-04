app.controller('registerCtrl', [
    '$scope',
    'AuthService',
    '$state',
    '$window',
    '$timeout',
    function($scope, AuthService, $state, $window, $timeout) {
        $scope.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
        };

        $scope.signup = () => {
            AuthService.register($scope.user).then(function(response) {
                $state.go('login');
                const alertPopup = $window.alert('Register success!');
            }).catch(function(errMsg) {
                const alertPopup = $window.alert('Fail!!');
            });
        };

        $scope.SetStyle = function() {
            if ($scope.user.role === "Recruteur") {
                $scope.changeStatus = 'Recruteur';

            } else if ($scope.user.role === "Simplonien") {
                $scope.changeStatus = 'Simplonien';
            }
        }
    }
]);
