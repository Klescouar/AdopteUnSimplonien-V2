app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', 'AuthService', '$stateParams', function($scope, serviceMailer, $window, AuthService, AuthService, $stateParams){

  const infoUser = AuthService.user();
  let token = $stateParams.token;

  $scope.updatePassword = (password) => {
    if (token = infoUser.token) {
      AuthService.resetUserPass(infoUser, password).then((res) => {
      });
    }
    else {
      console.log('token invalid');
    }
  };

}]);
