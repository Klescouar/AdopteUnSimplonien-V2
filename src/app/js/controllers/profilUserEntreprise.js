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
                  ville: $scope.student.ville,
                  photo: $scope.student.photo,
                  tags: $scope.student.tags,
                  description: $scope.student.description,
                  Sexe: $scope.student.Sexe,
                  SpecialiteUn: $scope.student.SpecialiteUn,
                  SpecialiteDeux: $scope.student.SpecialiteDeux,
                  SpecialiteTrois: $scope.student.SpecialiteTrois,
                  Github: $scope.student.Github,
                  Linkedin: $scope.student.Linkedin,
                  Portfolio: $scope.student.Portfolio,
                  CV: $scope.student.CV,
                  Twitter: $scope.student.Twitter,
                  StackOverFlow: $scope.student.StackOverFlow,
                  Mail: $scope.student.Mail,
                  Contrat: $scope.student.Contrat,
                  DatePromo: $scope.student.DatePromo,
                  Domaine: $scope.student.Domaine

              };

              serviceEntreprise.updateEntreprise(id, newInfos).then(alert("Vos informations on bien été mises à jour !"))
          };
          $state.reload();
      };
    }    
]);
