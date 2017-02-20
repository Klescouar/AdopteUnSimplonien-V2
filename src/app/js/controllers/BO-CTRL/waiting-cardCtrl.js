app.controller('waitingCardCtrl', ['$scope', 'serviceStudent', function($scope, serviceStudent){

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

  $scope.deleteStudent = (id, photo) => {
      const response = confirm("Voulez vous vraiment supprimer cet apprenant?");
      if (response === true) {
          serviceStudent.removeStudent(id).then((res) => {
            $scope.refreshInfoStudents();
          });
          if (photo !== '') {
              serviceStudent.removeStudentPhoto(photo).then((res) => {
                $scope.refreshInfoStudents();
              });
          }
      }
  };

}]);
