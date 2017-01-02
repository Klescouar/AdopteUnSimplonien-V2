app.controller('registerCtrl', ['$scope', 'AuthService', '$state', '$window', '$timeout',
 function($scope, AuthService, $state, $window, $timeout) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  };



  $scope.signup = () => {
    AuthService.register($scope.user).then(function(response) {
      $state.go('login');

      const alertPopup = $window.alert('Register success!');
    }).catch(function(errMsg) {
      const alertPopup = $window.alert('Register failed!');
    });
  };

$scope.changeRecruteur ;
$scope.changeSimplonien;

$scope.SetStyle = function () {

if ($('.combo-inscription > option:selected').text()=== "Recruteur") {

  $('.session-title').html("&nbsp;" + "recruteur");
  $scope.changeSimplonien = false;
  $scope.changeRecruteur = true;

}
else if ($('.combo-inscription > option:selected').text() === "Simplonien") {

      $('.session-title').html("&nbsp;" + "simplonien");
      $scope.changeRecruteur = false;
     $scope.changeSimplonien = true;

}


 }



}]);
