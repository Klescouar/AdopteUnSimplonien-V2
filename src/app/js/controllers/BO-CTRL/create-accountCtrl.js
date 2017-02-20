app.controller('createAccountCtrl', ['$scope', 'AuthService', 'serviceFilter', function($scope, AuthService, serviceFilter){

  $scope.studentAccount = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Simplonien'
  };

  $scope.recruiterAccount = {
    technology:'',
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Recruteur'
  };

  $scope.addRecruiterUser = () => {
      AuthService.register($scope.recruiterAccount).then(function(response) {
          alert(response);
      }).catch(function(errMsg) {
          alert(errMsg);
      });
  };

  $scope.addStudentUser = () => {
      AuthService.register($scope.studentAccount).then(function(response) {
        if (response.data.success === false) {
          alert(response.data.msg)
        } else {
          $scope.getAllUser();
        }
      }).catch(function(errMsg) {
          const alertPopup = alert('Register failed!');
      });
  };

  $scope.getAllSkill = () => {
      serviceFilter.getAllSkill().then(function(response) {
          $scope.skills = response.data;
      }).catch(function(errMsg) {
          console.log('show skill failed!');
      });
  }
  $scope.getAllSkill();


}]);
