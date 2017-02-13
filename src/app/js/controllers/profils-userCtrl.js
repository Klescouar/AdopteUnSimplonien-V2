app.controller('profilsUserCtrl',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', 'serviceFilter', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent, serviceFilter) {
  $scope.member = AuthService.user();
  $scope.showEditProfilUser = false;
  $scope.photo = '';
  $scope.turnOff = false;
  $scope.student = {};
  $scope.tab = 'fiche';

  if (!$scope.student.tags) {
    $scope.student.tags = [];
  }

  if (!$scope.student.Contrat){
    $scope.student.Contrat = ['CDD'];
  };


  $scope.newPassword = {
    oldpass: '',
    newpass: '',
    confirmNewpass: ''
  };

  console.log($scope.student.Contrat);

  $scope.showContracts = () => {
    console.log($scope.student.Contrat);
  };
  // UPDATE COMPTES
  $scope.member = AuthService.user();
  // INFOS PERSOs
  $scope.updateUser = (id) => {
    const response = confirm("Voulez vous vraiment modifier vos informations ?");
    if (response === true) {
      $scope.validate = false;
      const newInfos = {
        firstName: $scope.member.firstName,
        lastName: $scope.member.lastName,
        email: $scope.member.email
      }
      AuthService.updateUser(id, newInfos).then((res) => {
        alert("Vos informations on bien été mises à jour !");
      })
    }
  }
  // PASSWORD
  $scope.updateUserPass = (id) => {
    console.log($scope.newPassword);
    if ($scope.newPassword.newpass === $scope.newPassword.confirmNewpass){
      AuthService.updateUserPassFromProfil(id, $scope.newPassword).then((res) => {
        if (res.data.msg === 'Wrong password') {
          alert('Mauvais mot de passe');
        } else {
          alert('Mot de passe modifié!')
        }
      });
    } else {
      alert('la confirmation du nouveau mot de passe ne correspond pas')
    }
  }

  $scope.cardExist = false;

  // Get Data for Selects
  // Contracts
  $scope.getAllContract = () => {
    serviceFilter.getAllContract().then(function(response) {
      $scope.contracts = response.data;
    }).catch(function(errMsg) {
      console.log('show school failed!');
    });
  }
  $scope.getAllContract();
  // Schools
  $scope.getAllSchool = () => {
    serviceFilter.getAllSchool().then(function(response) {
      $scope.schools = response.data;
    }).catch(function(errMsg) {
      console.log('show school failed!');
    });
  }
  $scope.getAllSchool();
  // Skills
  $scope.getAllSkill = () => {
    serviceFilter.getAllSkill().then(function(response) {
      $scope.skills = response.data;
    }).catch(function(errMsg) {
      console.log('show skill failed!');
    });
  }
  $scope.getAllSkill();


  $scope.getMemberInfo = (id) => {
    serviceStudent.getStudentByMemberId(id).then((response) => {
      if (response.data.success === false) {
        $scope.cardExist = false;
      } else {
        console.log(response.data);
        $scope.cardExist = true;
        $scope.student = response.data;
        const path = '/assets/images/' + $scope.student.photo;
        let html = '';
        html += '<img src="' + path + '" alt="' + $scope.student.photo + '">';
        $('#upload-pic').html(html);
      }
    }, (err) => {
      console.log("Error");
    });
  }
  $scope.getMemberInfo($scope.member._id);

  console.log($scope.student.Contrat);


  $scope.deleteCard = (id) => {
    const response = confirm("Voulez vous vraiment supprimer votre fiche?");
    if (response === true) {
      serviceStudent.removeStudent(id).then(function(response) {
        $scope.cardExist = false;
        $scope.getMemberInfo($scope.member._id);
        $state.reload();
      });
    }
  }

  // TAGS
  // Ajout Tags
  $scope.addTag = function(tag) {
    if (!tag || tag.length === 0) {
      return
    }
    else if (tag.length !== 0) {
      $scope.student.tags.push(tag);
    }
  }
  // Suppression Tag
  $scope.removeTag = function(tag){
    $scope.student.tags.splice($scope.student.tags.indexOf(tag),1);
  }

  $scope.createSimplonien = () => {
    const dataStudent = {
    memberId: $scope.member._id,
    verified: false,
    nom: $scope.member.lastName,
    prenom: $scope.member.firstName,
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
    Mail: $scope.member.email,
    Contrat: $scope.student.Contrat,
    DatePromo: $scope.student.DatePromo,
    Domaine: $scope.student.Domaine,
    ProjetUn: $scope.student.ProjetUn,
    ProjetDeux: $scope.student.ProjetDeux,
    ProjetTrois: $scope.student.ProjetTrois
    };
    console.log(dataStudent);
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
    const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
    if (response === true) {
      const newInfos = {
        nom: $scope.member.lastName,
        prenom: $scope.member.firstName,
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
        Mail: $scope.member.email,
        Contrat: $scope.student.Contrat,
        DatePromo: $scope.student.DatePromo,
        Domaine: $scope.student.Domaine,
        ProjetUn: $scope.student.ProjetUn,
        ProjetDeux: $scope.student.ProjetDeux,
        ProjetTrois: $scope.student.ProjetTrois
      };
      console.log($scope.student);
      serviceStudent.updateStudent(id, newInfos).then((response) => {})
      alert("Apprenant modifié!")
    };
  };

  // Photo Upload
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
  // Form Input Label Animation
  $(function(){
    var onClass = "on";
    var showClass = "show";
    $("input,textarea").bind("checkval",function(){
      var label = $(this).prev("label");
      if(this.value !== ""){
        label.addClass(showClass);
      } else {
        label.removeClass(showClass);
      }
    }).on("keyup",function(){
      $(this).trigger("checkval");
    }).on("focus",function(){
      $(this).prev("label").addClass(onClass);
    }).on("blur",function(){
      $(this).prev("label").removeClass(onClass);
    }).trigger("checkval");
  });
}]);
