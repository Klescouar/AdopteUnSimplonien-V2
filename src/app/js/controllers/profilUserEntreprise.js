app.controller('profilUserEntreprise', ['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', '$timeout', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent,$timeout) {
		$scope.newPassword = {
		    newpass: '',
		    oldpass: ''
		};
        		// $scope.member = {
          //   			company:'',
          //   			firstName: '',
          //   			lastName: '',
          //   			email:''
        		// };
		$scope.passwordChecked='';
		$scope.anime = true;
		$scope.validate = true;
  		$scope.oldPassVerif = true;
  		$scope.required = true;
		$scope.member = AuthService.user();

// ANIMATION CHANGING VIEW

$scope.changeView = () => {
                $scope.oldPassVerif = true;
                	$scope.required = false;
               	$scope.validate = true;
		   $scope.anime = !$scope.anime;
		   if ($scope.anime === false) {
		       $('.button-change-view').val("Gérer mes informations personnelles");
		   } else if ($scope.anime === true) {
		       $('.button-change-view').val("Gérer mon mot de passe");
		   }
}

// UPDATE INFORMATIONS USER

$scope.updateUser = (id) => {
	console.log($scope.member.company)
	$scope.validate = true;
        	if ($scope.member.company != '' && $scope.member.firstName != '' && $scope.member.lastName != '' && $scope.member.email !='' ) {
		 const response = confirm("Voulez vous vraiment modifier vos informations ?");
		 if (response === true) {
		     $scope.validate = false;
             	$timeout(function () {
              		$scope.validate = true;
                	}, 6000);
		     const newInfos = {
		         company: $scope.member.company,
		         firstName: $scope.member.firstName,
		         lastName: $scope.member.lastName,
		         email: $scope.member.email
		     }
		     AuthService.updateUser(id, newInfos).then((res) => {
		      })
		 }
	}
};

	// UPDATE PASSWORD USER
$scope.updateUserPass = (id, newPassword) => {
	$scope.validate = true;
          if ($scope.newPassword.oldpass != '' && $scope.newPassword.newpass != '' ) {
             if (newPassword.newpass.trim().length >= 8) {
                if (newPassword.newpass === $scope.passwordChecked) {
		AuthService.updateUserPassFromProfil(id, newPassword).then((res) => {
                    if (res.data.msg === 'Wrong password') {
		$scope.oldPassVerif = false;
                    }else{
                    	$scope.oldPassVerif = true;
                      	$scope.validate = false;
             	$timeout(function () {
              		$scope.validate = true;
                	}, 6000);
                      	$scope.required = true;
                      	$scope.newPassword = {
                        		newpass: '',
                        		oldpass: ''
                      	};
                      	$scope.passwordChecked = '';
                    	}
		});
	     }
              }
          }
      }
    }
]);
