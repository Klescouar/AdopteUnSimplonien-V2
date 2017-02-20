app.controller('deleteCardCtrl', ['$scope', 'serviceStudent', function($scope, serviceStudent){

  $scope.refreshInfoStudents = () => {
      serviceStudent.getAllStudent().then((res) => {
          $scope.simploniens = res.data;
      });
  }
  $scope.refreshInfoStudents();

  $scope.showOneStudent = (id) => {
      $scope.refreshInfoStudents();
      serviceStudent.getStudentById(id).then((res) => {
          $scope.student = res.data;
          if ($scope.student.dispo) {
             $scope.student.dispo = new Date($scope.student.dispo);
          }
          const path = '/assets/images/' + $scope.student.photo;
          let html = '';
              html += '<img src="' + path + '" alt="' + $scope.student.photo + '">';
          $('#upload-pic').html(html);
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
