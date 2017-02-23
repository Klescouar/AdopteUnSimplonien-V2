app.controller('sendPassForResetCtrl', ['$scope', 'serviceMailer', '$window', 'AuthService', '$timeout',function($scope, serviceMailer, $window, AuthService,$timeout){

$scope.resetPassOK = false;
$scope.errorMail = true;

  $scope.startResetPass = (mail) => {
  $scope.errorMail = true;
    AuthService.createToken(mail).then((res) => {
    	console.log(res.data.success)
        if (res.data.success === true) {
        	$scope.resetPassOK = true;
            	$timeout(function () {
        	$scope.resetPassOK = false;
             }, 6000);
        }else if (res.data.success === false){
        	$scope.errorMail = false;
        }
    });
  };

}]);
