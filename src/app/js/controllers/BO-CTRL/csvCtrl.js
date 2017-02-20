app.controller('csvCtrl', ['$scope', 'AuthService', function($scope, AuthService){

    AuthService.getCsvRecruiter();

    AuthService.getCsvStudent();

    AuthService.getCsvStudentProfil();

}]);
