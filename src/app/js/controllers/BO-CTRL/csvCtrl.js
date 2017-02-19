app.controller('csvCtrl', ['$scope', 'AuthService', function($scope, AuthService){

  $scope.getCsvRecruiter = () => {
    AuthService.getCsvRecruiter();
  }

  $scope.getCsvStudent = () => {
    AuthService.getCsvStudent();
  }

  $scope.getCsvStudentProfil = () => {
    AuthService.getCsvStudentProfil();
  }

}]);
