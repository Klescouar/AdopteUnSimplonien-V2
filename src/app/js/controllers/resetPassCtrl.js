app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', function($scope, serviceMailer, $window, AuthService){

  $scope.startResetPass = (mail) => {
    AuthService.updateUserPass(mail).then((res) => {
      // console.log(res.data);
    });
  };

}]);
