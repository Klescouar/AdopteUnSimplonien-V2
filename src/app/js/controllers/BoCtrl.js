app.controller('boCtrl', ['$scope','AuthService','$http','serviceFilter','$state','$timeout', 'serviceStudent', function($scope, AuthService, $http, serviceFilter, $state, $timeout, serviceStudent) {

      $scope.show = 0;
      $scope.resetStudent = () => {
        $scope.student = {};
        $scope.student.tags = [];
        $('#upload-pic').html('');
        $scope.show = 3;

      }

      $scope.school = {};
      $scope.skill = {};
      $scope.student = {};
      $scope.contract = {};
      $scope.studentAccount = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
      };
      $scope.recruiterAccount = {
          technology:'',
          company : '',
          firstName: '',
          lastName: '',
          email: '',
          password: ''
      };

        //////////////////////////ADMIN STUDENT CONTROL//////////////////////////

      $scope.refreshInfoStudents = () => {
          serviceStudent.getAllStudent().then((res) => {
              $scope.simploniens = res.data;
          });
      }
      $scope.refreshInfoStudents();

      $scope.acceptSimplonien = (studentId) => {
          serviceStudent.studentVerified(studentId).then((res) => {
            $scope.refreshInfoStudents();
          });
      };

      $scope.addTag = function(tag) {
        if (tag.length !== 0) {
          $scope.student.tags.push(tag);
        } else {
          return
        }
      }

      if (!$scope.student.tags) {
        $scope.student.tags = [];
      }

      $scope.createSimplonien = () => {
          const dataStudent = {
            verified: true,
            nom: $scope.student.nom,
            prenom: $scope.student.prenom,
            age: $scope.student.age,
            ville: $scope.student.ville,
            photo: $scope.photo,
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
            Domaine: $scope.student.Domaine,
            ProjetUn: $scope.student.ProjetUn,
            ProjetDeux: $scope.student.ProjetDeux,
            ProjetTrois: $scope.student.ProjetTrois
          };

          serviceStudent.addStudent(dataStudent).then((res) => {
            if (res.statusText === 'OK') {
              alert('Simplonien créé!')
            } else {
              alert('FAIL!')
            }
          });

      };

      $scope.deleteStudent = (id) => {
          const response = confirm("Voulez vous vraiment supprimer cet apprenant?");
          if (response === true) {
              serviceStudent.removeStudent(id).then((res) => {
                $scope.refreshInfoStudents();
              });
          }
      };

      $scope.updateStudent = (id) => {
          const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
          if (response === true) {
              const newInfos = {
                nom: $scope.student.nom,
                prenom: $scope.student.prenom,
                age: $scope.student.age,
                ville: $scope.student.ville,
                age: $scope.student.age,
                photo: $scope.photo ? $scope.photo : $scope.student.photo,
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
                Domaine: $scope.student.Domaine,
                ProjetUn: $scope.student.ProjetUn,
                ProjetDeux: $scope.student.ProjetDeux,
                ProjetTrois: $scope.student.ProjetTrois
              };
              serviceStudent.updateStudent(id, newInfos).then((res) => {
                alert("Apprenant modifié!");
                $scope.refreshInfoStudents();
                $scope.show = 4;
              }
            )
          };
      };

      $scope.showOneStudent = (index) => {
          $scope.refreshInfoStudents();
          $scope.show = 5;
          serviceStudent.getStudentById(index).then((res) => {
              $scope.student = res.data;
              const path = '/assets/images/' + $scope.student.photo;
              let html = '';
                  html += '<img src="' + path + '" alt="' + $scope.student.photo + '">';
              $('#upload-pic').html(html);
          });
      };

      //////////////////////////ADMIN USERS CONTROL//////////////////////////

      $scope.getAllUser = () => {
          AuthService.getAllUser($scope.user).then(function(response) {
              $scope.allUser = response.data.user;
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('show profils members failed!');
          });
      };
      $scope.getAllUser();

      $scope.addStudentUser = () => {
          AuthService.register($scope.studentAccount).then(function(response) {
              $scope.getAllUser();
              $scope.show = 2;
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Register failed!');
          });
      };

      $scope.addRecruiterUser = () => {
          AuthService.register($scope.recruiterAccount).then(function(response) {
              $scope.getAllUser();
              $scope.show = 2;
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Register failed!');
          });
      };

      $scope.removeUser = (id) => {
          const response = confirm("Voulez vous vraiment supprimer cet utilisateur?");
          if (response === true) {
              AuthService.removeFromAdmin(id).then(function(response) {
                  $scope.getAllUser();
                  const alertPopup = $window.alert('Remove success!');
              }).catch(function(errMsg) {
                  const alertPopup = $window.alert('Remove failed!');
              });
          }
      };

      //////////////////////////ADMIN SKILLS CONTROL//////////////////////////

      $scope.getAllSkill = () => {
          serviceFilter.getAllSkill().then(function(response) {
              $scope.skills = response.data;
          }).catch(function(errMsg) {
              console.log('show skill failed!');
          });
      }

      $scope.addSkill = () => {
          serviceFilter.addSkill($scope.skill).then(function(response) {
            $scope.getAllSkill();
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Add Skill failed!');
          });
      };

      $scope.removeSkill = (id) => {
          serviceFilter.removeSkill(id).then(function(response) {
            $scope.getAllSkill();
          }).catch(function(errMsg) {
              console.log('remove skill failed!');
          });
      }
      $scope.getAllSkill();

      //////////////////////////ADMIN SCHOOLS CONTROL//////////////////////////

      $scope.getAllSchool = () => {
          serviceFilter.getAllSchool().then(function(response) {
              $scope.schools = response.data;
              console.log($scope.schools);
          }).catch(function(errMsg) {
              console.log('show school failed!');
          });
      }

      $scope.addSchool = () => {
          serviceFilter.addSchool($scope.school).then(function(response) {
            $scope.getAllSchool();
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Add school failed!');
          });
      };

      $scope.removeSchool = (id) => {
          serviceFilter.removeSchool(id).then(function(response) {
            $scope.getAllSchool();
          }).catch(function(errMsg) {
              console.log('remove school failed!');
          });
      }
      $scope.getAllSchool();

      //////////////////////////ADMIN CONTRACTS CONTROL//////////////////////////

      $scope.getAllContract = () => {
          serviceFilter.getAllContract().then(function(response) {
              $scope.contracts = response.data;
          }).catch(function(errMsg) {
              console.log('show school failed!');
          });
      }

      $scope.addContract = () => {
          serviceFilter.addContract($scope.contract).then(function(response) {
            $scope.getAllContract();
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Add contract failed!');
          });
      };

      $scope.removeContract = (id) => {
          serviceFilter.removeContract(id).then(function(response) {
            $scope.getAllContract();
          }).catch(function(errMsg) {
              console.log('remove contract failed!');
          });
      }
      $scope.getAllContract();

      //////////////////////////ADMIN PROMO CONTROL//////////////////////////

      $scope.getAllPromo = () => {
          serviceFilter.getAllPromo().then(function(response) {
              $scope.promos = response.data;
          }).catch(function(errMsg) {
              console.log('show promo failed!');
          });
      }

      $scope.addPromo = () => {
          serviceFilter.addPromo($scope.promo).then(function(response) {
            $scope.getAllPromo();
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Add promo failed!');
          });
      };

      $scope.removePromo = (id) => {
          serviceFilter.removePromo(id).then(function(response) {
            $scope.getAllPromo();
          }).catch(function(errMsg) {
              console.log('remove promo failed!');
          });
      }
      $scope.getAllPromo();



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

      // JQUERY
      $(document).ready(() => {
          $(() => {
              const nav = $('.container-nav-bo');
              if (nav.length) {
                  const stickyNavTop = nav.offset().top + 4;
                  $(window).scroll(() => {
                      if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                          $('.container-nav-bo').addClass('sticktotop');
                          $('.container-interface').addClass('marginToFix2');
                      } else {
                          $('.container-nav-bo').removeClass('sticktotop');
                          $('.container-interface').removeClass('marginToFix2');
                      }
                  });
              }
          });
      });

    }
]);
