app.controller('profilUserEntreprise',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', 'AuthService', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent, AuthService) {

	$scope.member = AuthService.user();
	console.log(AuthService.user());

	$scope.updateUser = (id) => {
          const response = confirm("Voulez vous vraiment modifier vos informations ?");
          if (response === true) {
              const newInfos = {
                  company: $scope.member.company,
                  firstName: $scope.member.firstName,
                  lastName: $scope.member.lastName,
                  email: $scope.member.email,
                  password: $scope.member.password

              };

              AuthService.updateUser(id, newInfos).then((res) => {
								alert("Vos informations on bien été mises à jour !");
		})
          };
      };
    }
]);
