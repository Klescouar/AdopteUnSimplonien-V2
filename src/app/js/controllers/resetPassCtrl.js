app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', 'AuthService', '$stateParams', function($scope, serviceMailer, $window, AuthService, AuthService, $stateParams){

  const infoUser = AuthService.user();
  let token = $stateParams.token;
  console.log(token);

  $scope.updatePassword = (password) => {
    if (token = infoUser.token) {
      AuthService.resetUserPass(infoUser, password).then((res) => {
        console.log(res);
      });
    }
    else {
      console.log('token invalid');
    }
  };

}]);
