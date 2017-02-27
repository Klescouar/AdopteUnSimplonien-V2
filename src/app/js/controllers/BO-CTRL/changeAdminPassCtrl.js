app.controller('changeAdminPassCtrl', ['$scope', 'AuthService', '$timeout', function($scope, AuthService, $timeout){

  $scope.newPassword = {
    newpass: '',
    oldpass: ''
  };

  $scope.oldPassVerif = true;
  $scope.validate = true;
  $scope.member = AuthService.user();

  $scope.changeAdminPass = (id) => {
    if ($scope.newPassword.oldpass != '' && $scope.newPassword.newpass != '') {
      if ($scope.newPassword.newpass.trim().length >= 8) {
        if ($scope.newPassword.newpass === $scope.passwordChecked) {
          AuthService.updateUserPassFromProfil(id, $scope.newPassword).then((res) => {
            if (res.data.msg === 'Wrong password') {
              $scope.oldPassVerif = false;
              console.log($scope.oldPassVerif);
            } else {
              $scope.oldPassVerif = true;
              $scope.validate = false;
              $timeout(function() {
                $scope.validate = true;
              }, 6000);
              $scope.newPassword = {
                newpass: '',
                oldpass: ''
              };
            }
          });
        }
      }
    }
  }
}]);
