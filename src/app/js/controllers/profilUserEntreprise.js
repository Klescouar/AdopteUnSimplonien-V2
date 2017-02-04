app.controller('profilUserEntreprise', [
    '$http',
    '$scope',
    '$rootScope',
    'AuthService',
    '$state',
    '$window',
    'serviceStudent',
    'AuthService',
    function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent, AuthService) {
		$scope.newPassword = {
		    newpass: '',
		    oldpass: ''
		};
		$scope.passwordChecked='';
		$scope.anime = true;
		$scope.validate = true;
            		$scope.oldPassVerif = true;
		$scope.member = AuthService.user();

		$scope.updateUser = (id) => {
		$scope.validate = true;
		    const response = confirm("Voulez vous vraiment modifier vos informations ?");
		    if (response === true) {
		        $scope.validate = false;
		        const newInfos = {
		            company: $scope.member.company,
		            firstName: $scope.member.firstName,
		            lastName: $scope.member.lastName,
		            email: $scope.member.email
		        }
		        AuthService.updateUser(id, newInfos).then((res) => {

		            alert("Vos informations on bien été mises à jour !");

		        })
		    }
		}
		$scope.changeView = () => {
                	$scope.oldPassVerif = true;
               	 $scope.validate = true;
		    $scope.anime = !$scope.anime;
		    if ($scope.anime === false) {
		        $('.button-change-view').val("Gérer mes informations personnelles");
		    } else if ($scope.anime === true) {
		        $('.button-change-view').val("Gérer mon mot de passe");
		    }
		}
	$scope.updateUserPass = (id, newPassword) => {
	$scope.validate = true;
             if (newPassword.newpass.trim().length >= 8) {
                if (newPassword.newpass === $scope.passwordChecked) {
		AuthService.updateUserPassFromProfil(id, newPassword).then((res) => {
                    if (res.data.msg === 'Wrong password') {
		$scope.oldPassVerif = false;
                    }else{
                    	$scope.oldPassVerif = true;
                      $scope.validate = false;
                      $scope.newPassword = {
                        newpass: '',
                        oldpass: ''
                      };
                      $scope.passwordChecked = '';
                    }
		});
              }
          }
      }
    }
]);
