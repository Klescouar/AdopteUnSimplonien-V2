app.controller('profilUserEntreprise',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent) {

	$scope.member = AuthService.user();
	console.log($scope.member)

	$scope.updateEntreprise = (id) => {
          const response = confirm("Voulez vous vraiment modifier vos informations ?");
          if (response === true) {
              const newInfos = {
                  company: $scope.member.company,
                  firstName: $scope.member.firstName,
                  lastName: $scope.member.lastName,
                  email: $scope.member.email,
                  password: $scope.member.password

              };

              serviceEntreprise.updateEntreprise(id, newInfos).then(alert("Vos informations on bien été mises à jour !"))
          };
          $state.reload();
      };
    }    
]);
