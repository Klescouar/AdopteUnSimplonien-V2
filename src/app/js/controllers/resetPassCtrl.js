app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', '$stateParams', function($scope, serviceMailer, $window, AuthService, $stateParams){

  const infoUser = AuthService.user();
  let token = $stateParams.token;

  $scope.updatePassword = (password) => {
    if (token = infoUser.token) {
      AuthService.resetUserPass(infoUser, password).then((res) => {
        alert('Mot de passe changé!')
      });
    }
    else {
      console.log('token invalid');
    }
  };

}]);
