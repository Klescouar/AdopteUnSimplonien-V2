app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', 'AuthService', function($scope, serviceMailer, $window, AuthService, AuthService){

  const infoUser = AuthService.user();
  console.log(infoUser);

  $scope.updatePassword = (password) => {
    AuthService.resetUserPass(infoUser, password).then((res) => {
      console.log(res);
    });
  };

}]);
