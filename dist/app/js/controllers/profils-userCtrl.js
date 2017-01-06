app.controller('profilsUserCtrl', ['$http','$scope','$rootScope','AuthService','$state','$window', function($http,$scope,$rootScope, AuthService, $state, $window) {
        $scope.member = AuthService.user();
        $scope.showEditProfilUser = false;

        $rootScope.getInfo = () => {
            AuthService.getInfo($scope.user).then(function(response) {
                $scope.member = response.data.user;
                $scope.member === undefined
                    ? $state.go('login')
                    : $state.current;
            }).catch((errMsg) => {
                const alertPopup = $window.alert('show profil member failed!');
                $state.go('login');
            });
        };

        $scope.getMemberInfo = (id) => {
            $http.get('/api/backOffice/infoStudent/fromMember/' + id).then((response) => {
                $scope.student = response.data;
            }, (err) => {
                console.log("Error");
            });
        }

        $scope.deleteCard = (id) => {
          const response = confirm("Voulez vous vraiment supprimer votre fiche?");
          if (response === true) {
              $http.delete('/api/backOffice/removeStudent/' + id).then(function(response) {
              });
          }
        }

        $scope.getMemberInfo($scope.member._id);

        $scope.createSimplonien = () => {
            const dataStudent = {
                memberId: $scope.member._id,
                nom: $scope.boCreateLastName,
                prenom: $scope.boCreateName,
                age: $scope.boCreateOld,
                ville: $scope.boCreatePromo,
                photo: $scope.boCreatePhoto,
                tags: $scope.boCreateTags,
                description: $scope.boCreateAbout,
                Sexe: $scope.boCreateSexe,
                SpecialiteUn: $scope.boCreateSpeOne,
                SpecialiteDeux: $scope.boCreateSpeTwo,
                SpecialiteTrois: $scope.boCreateSpeThree,
                Github: $scope.boCreateGithub,
                Linkedin: $scope.boCreateLinkedin,
                Portfolio: $scope.boCreatePortfolio,
                CV: $scope.boCreateCV,
                Twitter: $scope.boCreateTwitter,
                StackOverFlow: $scope.boCreateStackOverFlow,
                Mail: $scope.boCreateMail,
                Contrat: $scope.boCreateContrat,
                DatePromo: $scope.boCreateDatePromo,
                Domaine: $scope.boCreateDomaine
            };

            $http.post('/api/backOffice/addStudent', dataStudent).then((response) => {
                console.log(response.data);
                if (response.data === 'error') {
                    alert('Déja inscrit!')
                } else {
                    alert('Simplonien créé!');
                }
                $state.reload();
            }, (err) => {
                console.log("Error");
            });
        }

        $rootScope.getInfo();

    }
]);
