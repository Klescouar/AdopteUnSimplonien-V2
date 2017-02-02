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
		        AuthService.updateUser(id, newInfos).then((res) => {

		            alert("Vos informations on bien été mises à jour !");

		        })
		    }
		}
		$scope.changeView = () => {
		    $scope.validate = true;
		    $scope.anime = !$scope.anime;
		    if ($scope.anime === false) {
		        $('.button-change-view').val("Gérer mes informations personnelles").delay(80000);
		    } else if ($scope.anime === true) {
		        $('.button-change-view').val("Gérer mon mot de passe");
		    }
		}
		$scope.updateUserPass = (id, newPassword) => {
			AuthService.updateUserPassFromProfil(id, newPassword).then((res) => {
				alert(res.data.msg);
			});
		};
}
]);
