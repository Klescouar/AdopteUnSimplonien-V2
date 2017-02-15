app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', '$stateParams', function($scope, serviceMailer, $window, AuthService, $stateParams){
  $scope.resetPassOK = false;
  const infoUser = AuthService.user();

  $scope.updatePassword = (password) => {
      AuthService.resetUserPass($stateParams.token, password).then(function(res) {
          if (res.data.success === 'Erreur') {
              alert('error')
          } else {
            $scope.resetPassOK = true;
          }
      })
  }
}]);
