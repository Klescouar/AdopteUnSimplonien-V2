app.controller('deleteUserCtrl', ['$scope', 'AuthService', 'serviceStudent', '$window', function($scope, AuthService, serviceStudent, $window){
  $scope.allUser = [];
  const getOnlyStudentAndRecruiter = (item) => {
    if (item.role === 'Simplonien' || item.role === 'Recruteur') {
      return $scope.allUser.push(item);
    }
  }

  $scope.getAllUser = () => {
    $scope.allUser = [];
      AuthService.getAllUser().then(function(response) {
          response.data.user.map(getOnlyStudentAndRecruiter);
      }).catch(function(errMsg) {
          const alertPopup = $window.alert('show profils members failed!');
      });
  };
  $scope.getAllUser();

  $scope.removeUser = (id, role) => {
      const response = confirm("Voulez vous vraiment supprimer cet utilisateur?");
      if (response === true) {
          AuthService.removeFromAdmin(id).then(function(response) {
              $scope.getAllUser();
              const alertPopup = $window.alert('Remove success!');
          }).catch(function(errMsg) {
              const alertPopup = $window.alert('Remove failed!');
          });
          if (role === 'Simplonien') {
              angular.forEach($scope.simploniens, (val) => {
                  if (val.memberId === id) {
                      serviceStudent.removeStudentFromUser(id).then((res) => {
                        $scope.refreshInfoStudents();
                      });

                      if (val.photo !== '') {
                          serviceStudent.removeStudentPhoto(val.photo).then((res) => {
                            $scope.refreshInfoStudents();
                          });
                      }
                  }
              })
          }
      }
  };

}]);
