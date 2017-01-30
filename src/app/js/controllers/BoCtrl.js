app.controller('boCtrl', ['$scope','AuthService','$http','serviceFilter','$state','$timeout', 'serviceFilter', 'serviceStudent', function($scope, AuthService, $http, serviceFilter, $state, $timeout, serviceFilter, serviceStudent) {

      $scope.show = 0;
      $scope.school = {};
      $scope.skill = {};
      $scope.contract = {};
      $scope.user = {
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
          serviceStudent.studentVerified(studentId);
          refreshInfoStudents();
      };

      $scope.createSimplonien = () => {
          const dataStudent = {
              verified: true,
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

          serviceStudent.addStudent(dataStudent);

      };

      $scope.deleteStudent = (id) => {
          const response = confirm("Voulez vous vraiment supprimer cet apprenant?");
          if (response === true) {
              serviceStudent.removeStudent(id);
              $scope.refreshInfoStudents();
          }
      };

      $scope.updateStudent = (id) => {
          const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
          if (response === true) {
              const newInfos = {
                  nom: document.getElementById("boCreateLastNameSimploniens").value,
                  prenom: document.getElementById("boCreateNameSimploniens").value,
                  age: document.getElementById("boCreateOldSimploniens").value,
                  ville: document.getElementById("boCreatePromoSimploniens").value,
                  photo: document.getElementById("boCreatePhotoSimploniens").value,
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
                  Contrat: document.getElementById("boCreateContratSimploniens").value,
                  DatePromo: document.getElementById("boCreateDatePromoSimploniens").value,
                  Domaine: document.getElementById("boCreateDomaineSimploniens").value

              };

              serviceStudent.updateStudent(id, newInfos).then(alert("Apprenant modifié!"))
          };
          $state.reload();
          $scope.show = 4;
      };

      $scope.showOneStudent = (index) => {
          $scope.refreshInfoStudents();
          $scope.show = 5;
          serviceStudent.getStudentById(index).then((res) => {
              $scope.student = res.data;
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

      $scope.addUser = () => {
          AuthService.register($scope.user).then(function(response) {
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
          serviceFilter.addSkill($scope.skill).then(function(response) {}).catch(function(errMsg) {
              const alertPopup = $window.alert('Add Skill failed!');
          });
          $scope.getAllSkill();
      };

      $scope.removeSkill = (id) => {
          serviceFilter.removeSkill(id).then(function(response) {}).catch(function(errMsg) {
              console.log('remove skill failed!');
          });
          $scope.getAllSkill();
      }
      $scope.getAllSkill();

      //////////////////////////ADMIN SCHOOLS CONTROL//////////////////////////

      $scope.getAllSchool = () => {
          serviceFilter.getAllSchool().then(function(response) {
              $scope.schools = response.data;
          }).catch(function(errMsg) {
              console.log('show school failed!');
          });
      }

      $scope.addSchool = () => {
          serviceFilter.addSchool($scope.school).then(function(response) {}).catch(function(errMsg) {
              const alertPopup = $window.alert('Add school failed!');
          });
          $scope.getAllSchool();
      };

      $scope.removeSchool = (id) => {
          serviceFilter.removeSchool(id).then(function(response) {}).catch(function(errMsg) {
              console.log('remove school failed!');
          });
          $scope.getAllSchool();
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
          serviceFilter.addContract($scope.contract).then(function(response) {}).catch(function(errMsg) {
              const alertPopup = $window.alert('Add contract failed!');
          });
          $scope.getAllContract();
      };

      $scope.removeContract = (id) => {
          serviceFilter.removeContract(id).then(function(response) {}).catch(function(errMsg) {
              console.log('remove contract failed!');
          });
          $scope.getAllContract();
      }
      $scope.getAllContract();

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
