app.controller('resetPassCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', '$stateParams', function($scope, serviceMailer, $window, AuthService, $stateParams){

  const infoUser = AuthService.user();

  $scope.updatePassword = (password) => {
      AuthService.resetUserPass($stateParams.token, password).then(function(res) {
          if (res.data.success === 'Erreur') {
              alert('error')
          } else {
              alert(res.data.msg)
          }
      })
  }
}]);
