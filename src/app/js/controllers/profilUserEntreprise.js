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
		$scope.anime = true;
		$scope.validate = true;
            $scope.verifPass = true;
            $scope.passLength = true;
            $scope.oldPassVerif = true;
		$scope.member = AuthService.user();

		$scope.updateUser = (id) => {
		    const response = confirm("Voulez vous vraiment modifier vos informations ?");
		    if (response === true) {
		        $scope.validate = false;
		        const newInfos = {
		            company: $scope.member.company,
		            firstName: $scope.member.firstName,
		            lastName: $scope.member.lastName,
		            email: $scope.member.email
		        }
		        console.log(newInfos);
		        AuthService.updateUser(id, newInfos).then((res) => {

		            alert("Vos informations on bien été mises à jour !");

		        })
		    }
		}
		$scope.changeView = () => {
		    $scope.validate = true;
		    $scope.anime = !$scope.anime;
		    if ($scope.anime === false) {
		        $('.button-change-view').val("Gérer mes informations personnelles");
		    } else if ($scope.anime === true) {
		        $('.button-change-view').val("Gérer mon mot de passe");
		    }
		}
		$scope.updateUserPass = (id, newPassword) => {
                
             if (newPassword.newpass.trim().length >= 8) {
              
                if (newPassword.newpass === $scope.passwordChecked) {
			AuthService.updateUserPassFromProfil(id, newPassword).then((res) => {
                    if (res.data.msg === 'Wrong password') {
				$scope.oldPassVerif = false;
                    }
			});
              }else if (newPassword.newpass !== $scope.passwordChecked) {
                    $scope.verifPass = false;
                }
          }else if (newPassword.newpass.length < 8 && newPassword.newpass.length > 0) {
                  console.log("coucou")
                $scope.passLength = false;
            }
      }
    }
]);
