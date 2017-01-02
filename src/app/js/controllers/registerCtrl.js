app.controller('registerCtrl', ['$scope', 'AuthService', '$state', '$window',
 function($scope, AuthService, $state, $window) {
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
      const alertPopup = $window.alert('Enregistré!');
    }).catch(function(errMsg) {
      const alertPopup = $window.alert('Fail!!');
    });
  };

}]);
