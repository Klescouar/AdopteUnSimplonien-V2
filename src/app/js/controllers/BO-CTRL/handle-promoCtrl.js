app.controller('handlePromoCtrl', ['$scope', 'serviceFilter', function($scope, serviceFilter){
  $scope.school = {};

  //////////////////////////ADMIN SCHOOLS CONTROL//////////////////////////

  $scope.getAllSchool = () => {
      serviceFilter.getAllSchool().then(function(response) {
          $scope.schools = response.data;
      }).catch(function(errMsg) {
          console.log('show school failed!');
      });
  }

  $scope.addSchool = () => {
    console.log($scope.school);
      serviceFilter.addSchool($scope.school).then(function(response) {
        $scope.getAllSchool();
      }).catch(function(errMsg) {
          const alertPopup = $window.alert('Add school failed!');
      });
  };

  $scope.removeSchool = (id) => {
      serviceFilter.removeSchool(id).then(function(response) {
        $scope.getAllSchool();
      }).catch(function(errMsg) {
          console.log('remove school failed!');
      });
  }
  $scope.getAllSchool();


  //////////////////////////ADMIN PROMO CONTROL//////////////////////////

  $scope.getAllPromo = () => {
      serviceFilter.getAllPromo().then(function(response) {
          $scope.promos = response.data;
      }).catch(function(errMsg) {
          console.log('show promo failed!');
      });
  }

  $scope.addPromo = () => {
      serviceFilter.addPromo($scope.promo).then(function(response) {
        $scope.getAllPromo();
      }).catch(function(errMsg) {
          const alertPopup = $window.alert('Add promo failed!');
      });
  };

  $scope.removePromo = (id) => {
      serviceFilter.removePromo(id).then(function(response) {
        $scope.getAllPromo();
      }).catch(function(errMsg) {
          console.log('remove promo failed!');
      });
  }
  $scope.getAllPromo();

}]);
