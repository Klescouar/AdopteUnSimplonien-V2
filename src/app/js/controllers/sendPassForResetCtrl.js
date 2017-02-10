app.controller('sendPassForResetCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', function($scope, serviceMailer, $window, AuthService){

  $scope.startResetPass = (mail) => {
    AuthService.createToken(mail).then((res) => {
        if (res.data.success) alert(res.data.msg);
    });
  };

}]);
