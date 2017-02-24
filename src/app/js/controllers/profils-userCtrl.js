app.controller('profilsUserCtrl',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', 'serviceFilter', 'moment', '$timeout', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent, serviceFilter, moment,$timeout) {
  $scope.member = AuthService.user();
  $scope.photo = '';
  $scope.turnOff = false;
  $scope.student = {};
  $scope.tab = 'fiche';
  $scope.submitted = false;
  $scope.checkSpe = true;
  const objectSkill = {};
  $scope.updateUser = false;
  $scope.updatePwd = false;
  $scope.createCard = false;
  $scope.updateCard = false;

  if (!$scope.student.tags) {
    $scope.student.tags = [];
  }

  if (!$scope.student.Contrat){
    $scope.student.Contrat = [];
  };


  $scope.myDate = new Date();

  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth(),
    $scope.myDate.getDate()
  );


  // UPDATE COMPTES
  $scope.member = AuthService.user();
  // INFOS PERSOs
  $scope.updateUser = (id) => {
      $scope.validate = false;
      const newInfos = {
        firstName: $scope.member.firstName,
        lastName: $scope.member.lastName,
        email: $scope.member.email
      }
      AuthService.updateUser(id, newInfos).then((res) => {
        $scope.member = AuthService.user();
        $scope.updateUser = true;
      })
  }
  // PASSWORD
  $scope.newPassword = {
    oldpass: '',
    newpass: '',
    confirmNewpass: ''
  };
  $scope.updateUserPass = (id) => {
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

  // Get Data for Selects
  // Contracts
  $scope.getAllContract = () => {
    serviceFilter.getAllContract().then(function(response) {
      $scope.contracts = response.data;
    }).catch(function(errMsg) {
      console.log('show contract failed!');
    });
  }
  $scope.getAllContract();

  // Schools
  $scope.getAllRegion = () => {
    serviceFilter.getAllRegion().then(function(response) {
      $scope.regions = response.data;
    }).catch(function(errMsg) {
      console.log('show school failed!');
    });
  }
  $scope.getAllRegion();

  // Skills
  $scope.getAllSkill = () => {
    serviceFilter.getAllSkill().then(function(response) {
      $scope.skills = response.data;
    }).catch(function(errMsg) {
      console.log('show skill failed!');
    });
  }
  $scope.getAllSkill();

  // PROMO
  $scope.getAllPromo = () => {
    serviceFilter.getAllPromo().then(function(response) {
      $scope.promos = response.data;
    }).catch(function(errMsg) {
      console.log('show promo failed!');
    });
  }
  $scope.getAllPromo();

  $scope.cardExist = '';
  $scope.getMemberInfo = (id) => {
    serviceStudent.getStudentByMemberId(id).then((response) => {
      if (response.data.success === false) {
        $scope.cardExist = 'enregistrer';
      } else {
        $scope.cardExist = 'modifier';
        $scope.student = response.data;
        if ($scope.student.dispo) {
           $scope.student.dispo = new Date($scope.student.dispo);
        }
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


  $scope.compareSkill = (key, value) => {
    const arraySkill = [];
    objectSkill[key] = value;
    Object.keys(objectSkill).map(function(key, index) {
      arraySkill.push(objectSkill[key]);
    });
    const unique = [...new Set(arraySkill)];
    if (Object.keys(objectSkill).length > unique.length) {
      $scope.checkSpe = false;
    } else {
      $scope.checkSpe = true;
    }
  };

  //////////// TAGS \\\\\\\\\\\\\\
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

/////////////// CREATE CARD \\\\\\\\\\\\\\\\\\\\
  $scope.createSimplonien = () => {
    console.log($scope.student.dispo);
    const dataStudent = {
    memberId: $scope.member._id,
    verified: false,
    nom: $scope.member.lastName,
    prenom: $scope.member.firstName,
    age: $scope.student.age,
    region: $scope.student.region,
    photo: $scope.photo,
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
    Mail: $scope.member.email,
    Contrat: $scope.student.Contrat,
    promo: $scope.student.promo,
    Domaine: $scope.student.Domaine,
    ProjetUn: $scope.student.ProjetUn,
    ProjetDeux: $scope.student.ProjetDeux,
    ProjetTrois: $scope.student.ProjetTrois
    };
    serviceStudent.addStudent(dataStudent).then((res) => {
      if (res.data === 'error') {
        alert('Déja inscrit!')
      } else {
        $scope.updateUser($scope.member._id);
        $scope.createCard = true;
      $timeout(function () {
        $scope.createCard = false;
        }, 6000);
        console.log(dataStudent);
      }
    }, (err) => {
      console.log("Error");
      });
  }

///////////// UPDATE CARD \\\\\\\\\\\\\\\\\\\\\

  $scope.updateStudent = (id) => {
    const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
    if (response === true) {
      const newInfos = {
        nom: $scope.member.lastName,
        prenom: $scope.member.firstName,
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
        Mail: $scope.member.email,
        Contrat: $scope.student.Contrat,
        promo: $scope.student.promo,
        Domaine: $scope.student.Domaine,
        ProjetUn: $scope.student.ProjetUn,
        ProjetDeux: $scope.student.ProjetDeux,
        ProjetTrois: $scope.student.ProjetTrois
      };

      serviceStudent.updateStudent(id, newInfos).then((res) => {
        $scope.updateCard = true;
        $timeout(function () {
        $scope.updateCard = false;
        }, 6000);
        $scope.updateUser($scope.member._id);
        alert("Apprenant modifié!");
        console.log(newInfos);
      })
    };
  };

  /////////// DELETE CARD \\\\\\\\\\\
  $scope.deleteCard = (id) => {
    const response = confirm("Voulez vous vraiment supprimer votre fiche?");
    if (response === true) {
      serviceStudent.removeStudent(id).then(function(response) {
        $scope.cardExist = 'enregistrer';
        $scope.getMemberInfo($scope.member._id);
        $state.reload();
      });
    }
  }

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
      $('.errorUploadStudent').html('');
      $('#upload-pic').html(html);
    } else {
      $('.errorUploadStudent').html('Format ou taille non conforme.');
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
