app.controller('handleAdminsCtrl', ['$scope', 'AuthService', function($scope, AuthService){

  $scope.admins = [];
  $scope.adminAccount = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Admin'
  };

  const getAdmins = (item) => {
    if (item.role === "Admin") {
      return $scope.admins.push(item);
    }
  }

  $scope.addAdminUser = () => {
      AuthService.register($scope.adminAccount).then(function(response) {
          alert('Admin créé!');
          $scope.getAllUser();
      }).catch(function(errMsg) {
          alert('Fail to create Admin!');
      });
  };

  $scope.removeUser = (id) => {
    console.log(id);
      const response = confirm("Voulez vous vraiment supprimer cet utilisateur?");
      if (response === true) {
          AuthService.removeFromAdmin(id).then(function(response) {
              $scope.getAllUser();
              alert('Admin supprimé!!');
          }).catch(function(errMsg) {
              alert('Echec de la suppression d\'Admin!');
          });
      }
  };

  $scope.getAllUser = () => {
      $scope.admins = [];
      AuthService.getAllUser().then(function(response) {
          response.data.user.map(getAdmins);
      }).catch(function(errMsg) {
          console.log('show admin failed!');
      });
  };
  $scope.getAllUser();

}]);
