app.controller('profilsUserCtrl',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', 'serviceFilter', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent, serviceFilter) {

        $scope.member = AuthService.user();
        $scope.showEditProfilUser = false;
        $scope.photo = '';
        $scope.turnOff = false;

        $scope.getAllContract = () => {
            serviceFilter.getAllContract().then(function(response) {
                $scope.contracts = response.data;
            }).catch(function(errMsg) {
                console.log('show school failed!');
            });
        }

        $scope.getAllContract();

        $scope.getMemberInfo = (id) => {
            serviceStudent.getStudentByMemberId(id).then((response) => {
                $scope.student = response.data;
                const path = '/assets/images/' + $scope.student.photo;
                let html = '';
                    html += '<img src="' + path + '" alt="' + $scope.student.photo + '">';
                $('#upload-pic').html(html);
            }, (err) => {
                console.log("Error");
            });
          }

        $scope.getMemberInfo($scope.member._id);

        $scope.deleteCard = (id) => {
            const response = confirm("Voulez vous vraiment supprimer votre fiche?");
            if (response === true) {
                serviceStudent.removeStudent(id).then(function(response) {
                    $scope.getMemberInfo($scope.member._id);
                    $state.reload();
                });
            }
        }

        $scope.createSimplonien = () => {
            const dataStudent = {
                memberId: $scope.member._id,
                verified: false,
                nom: $scope.student.nom,
                prenom: $scope.student.prenom,
                age: $scope.student.age,
                ville: $scope.student.ville,
                photo: $scope.student.photo,
                tags: document.getElementById("boCreateTagsSimploniens").value,
                description: document.getElementById("boCreateAboutSimploniens").value,
                Sexe: document.getElementById("boCreateSexeSimploniens").value,
                SpecialiteUn: document.getElementById("boCreateSpeOneSimploniens").value,
                SpecialiteDeux: document.getElementById("boCreateSpeTwoSimploniens").value,
                SpecialiteTrois: document.getElementById("boCreateSpeThreeSimploniens").value,
                Github: document.getElementById("boCreateGithubSimploniens").value,
                Linkedin: document.getElementById("boCreateLinkedinSimploniens").value,
                Portfolio: document.getElementById("boCreatePortfolioSimploniens").value,
                CV: document.getElementById("boCreateCVSimploniens").value,
                Twitter: document.getElementById("boCreateTwitterSimploniens").value,
                StackOverFlow: document.getElementById("boCreateStackOverFlowSimploniens").value,
                Mail: document.getElementById("boCreateMailSimploniens").value,
                Contrat: $scope.student.Contrat,
                DatePromo: document.getElementById("boCreateDatePromoSimploniens").value,
                Domaine: document.getElementById("boCreateDomaineSimploniens").value
            };

            serviceStudent.addStudent(dataStudent).then((response) => {
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

        $scope.updateStudent = (id) => {
          console.log($scope.studentContrat);
            const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
            if (response === true) {
                const newInfos = {
                    nom: document.getElementById("boCreateLastNameSimploniens").value,
                    prenom: document.getElementById("boCreateNameSimploniens").value,
                    age: document.getElementById("boCreateOldSimploniens").value,
                    ville: document.getElementById("boCreatePromoSimploniens").value,
                    photo: $scope.photo ? $scope.photo : $scope.student.photo,
                    tags: document.getElementById("boCreateTagsSimploniens").value,
                    description: document.getElementById("boCreateAboutSimploniens").value,
                    Sexe: document.getElementById("boCreateSexeSimploniens").value,
                    SpecialiteUn: document.getElementById("boCreateSpeOneSimploniens").value,
                    SpecialiteDeux: document.getElementById("boCreateSpeTwoSimploniens").value,
                    SpecialiteTrois: document.getElementById("boCreateSpeThreeSimploniens").value,
                    Github: document.getElementById("boCreateGithubSimploniens").value,
                    Linkedin: document.getElementById("boCreateLinkedinSimploniens").value,
                    Portfolio: document.getElementById("boCreatePortfolioSimploniens").value,
                    CV: document.getElementById("boCreateCVSimploniens").value,
                    Twitter: document.getElementById("boCreateTwitterSimploniens").value,
                    StackOverFlow: document.getElementById("boCreateStackOverFlowSimploniens").value,
                    Mail: document.getElementById("boCreateMailSimploniens").value,
                    Contrat: $scope.student.Contrat,
                    DatePromo: document.getElementById("boCreateDatePromoSimploniens").value,
                    Domaine: document.getElementById("boCreateDomaineSimploniens").value

                };

                serviceStudent.updateStudent(id, newInfos).then((response) => {})
                alert("Apprenant modifié!")
            };
        };


        $scope.uploadFiles = (formData) => {
            $.ajax({url: '/api/upload_photos', method: 'post', data: formData, processData: false, contentType: false}).done($scope.handleSuccess).fail(function(xhr, status) {
                alert(status);
            });
        }

        $scope.handleSuccess = (data) => {
            if (data.length > 0) {
                let html = '';
                const img = data[0];
                $scope.photo = img.filename;
                const path = '/assets/images/' + img.filename;
                if (img.status) {
                    html += '<img src="' + path + '" alt="' + img.filename + '">';
                } else {
                    html += '<a href="#" class="thumbnail">Invalid file type - ' + img.filename + '</a>';
                }
                $('#upload-pic').html(html);

            } else {
                alert('Image trop petite ou dans un mauvais format (formats accéptés: jpg,png,jpeg)')
            }
        }

        // On form submit, handle the file uploads.
        $('#upload-photos').on('submit', function(event) {
            event.preventDefault();

            // Get the files from input, create new FormData.
            const files = $('#photos-input').get(0).files,
                formData = new FormData();

            if (files.length === 0) {
                alert('Aucune photo séléctionnée.');
                return false;
            }

            // Append the files to the formData.
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                formData.append('photos[]', file, file.name);
            }

            // Note: We are only appending the file inputs to the FormData.
            $scope.uploadFiles(formData);
        });

    }
]);
