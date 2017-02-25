app.controller('modifyCardCtrl', ['$scope', '$stateParams', 'serviceStudent', 'serviceFilter', function($scope, $stateParams, serviceStudent, serviceFilter){
  $scope.student = {};
  $scope.student.tags = [];
  $scope.myDate = new Date();

  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth(),
    $scope.myDate.getDate()
  );

  const id = $stateParams.id;

  $scope.showOneStudent = (id) => {
      serviceStudent.getStudentById(id).then((res) => {
          $scope.student = res.data;
          if ($scope.student.dispo) {
             $scope.student.dispo = new Date($scope.student.dispo);
          }
          console.log($scope.student.dispo);
          const path = '/assets/images/' + $scope.student.photo;
          let html = '';
              html += '<img src="' + path + '" alt="' + $scope.student.photo + '">';
          $('#upload-pic').html(html);
      });
  };

  $scope.showOneStudent(id);

  $scope.updateStudent = (id) => {
      const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
      if (response === true) {
          const newInfos = {
            nom: $scope.student.nom,
            prenom: $scope.student.prenom,
            age: $scope.student.age,
            region: $scope.student.region,
            age: $scope.student.age,
            photo: $scope.photo ? $scope.photo : $scope.student.photo,
            tags: $scope.student.tags,
            description: $scope.student.description,
            Sexe: $scope.student.Sexe,
            dispo: $scope.student.dispo,
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
            promo: $scope.student.promo,
            Domaine: $scope.student.Domaine,
            ProjetUn: $scope.student.ProjetUn,
            ProjetDeux: $scope.student.ProjetDeux,
            ProjetTrois: $scope.student.ProjetTrois
          };
          serviceStudent.updateStudent(id, newInfos).then((res) => {
            alert("Apprenant modifié!");
          }
        )
      };
  };



    $scope.addTag = function(tag) {
      if (tag.length !== 0) {
        $scope.student.tags.push(tag);
      } else {
        return
      }
    }

    $scope.getAllPromo = () => {
        serviceFilter.getAllPromo().then(function(response) {
            $scope.promos = response.data;
        }).catch(function(errMsg) {
            console.log('show promo failed!');
        });
    }
    $scope.getAllPromo();

    $scope.getAllField = () => {
        serviceFilter.getAllField().then(function(response) {
            $scope.fields = response.data;
        }).catch(function(errMsg) {
            console.log('show field failed!');
        });
    }
    $scope.getAllField();
    
    $scope.getAllSkill = () => {
        serviceFilter.getAllSkill().then(function(response) {
            $scope.skills = response.data;
        }).catch(function(errMsg) {
            console.log('show skill failed!');
        });
    }
    $scope.getAllSkill();

    $scope.getAllRegion = () => {
        serviceFilter.getAllRegion().then(function(response) {
            $scope.regions = response.data;
        }).catch(function(errMsg) {
            console.log('show region failed!');
        });
    }
    $scope.getAllRegion();

    $scope.getAllContract = () => {
        serviceFilter.getAllContract().then(function(response) {
            $scope.contracts = response.data;
        }).catch(function(errMsg) {
            console.log('show school failed!');
        });
    }
    $scope.getAllContract();


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
            $('.errorUpload').html('');
            $('#upload-pic').html(html);
        } else {
            $('.errorUpload').html('Format ou taille non conforme.');
        }
    }
    // On form submit, handle the file uploads.
    $('#upload-photos').on('submit', function(event) {
        event.preventDefault();
        // Get the files from input, create new FormData.
        const files = $('#photos-input').get(0).files,
            formData = new FormData();
        if (files.length === 0) {
          $('.errorUploadStudent').html('Aucune photo selectionné.');
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


}]);
