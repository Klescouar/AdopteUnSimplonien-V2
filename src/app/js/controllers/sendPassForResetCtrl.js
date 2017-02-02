app.controller('sendPassForResetCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', function($scope, serviceMailer, $window, AuthService){

  $scope.startResetPass = (mail) => {
    AuthService.createToken(mail).then((res) => {
      const dataMail = {mail : mail, token : res.data};
      serviceMailer.sendMailForPass(dataMail).then((res) => {
        console.log(res.data);
      });
    });
  };

}]);
