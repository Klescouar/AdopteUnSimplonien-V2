app.controller('handleFilterCtrl', ['$scope', 'serviceFilter', function($scope, serviceFilter){
  //////////////////////////ADMIN SKILLS CONTROL//////////////////////////

  $scope.getAllSkill = () => {
      serviceFilter.getAllSkill().then(function(response) {
          $scope.skills = response.data;
      }).catch(function(errMsg) {
          console.log('show skill failed!');
      });
  }

  $scope.addSkill = () => {
      serviceFilter.addSkill($scope.skill).then(function(response) {
        $scope.getAllSkill();
      }).catch(function(errMsg) {
          alert('Add Skill failed!');
      });
  };

  $scope.removeSkill = (id) => {
      serviceFilter.removeSkill(id).then(function(response) {
        $scope.getAllSkill();
      }).catch(function(errMsg) {
          console.log('remove skill failed!');
      });
  }
  $scope.getAllSkill();

  //////////////////////////ADMIN REGION CONTROL//////////////////////////

  $scope.getAllRegion = () => {
      serviceFilter.getAllRegion().then(function(response) {
          $scope.regions = response.data;
      }).catch(function(errMsg) {
          console.log('show region failed!');
      });
  }

  $scope.addRegion = () => {
      serviceFilter.addRegion($scope.region).then(function(response) {
        $scope.getAllRegion();
      }).catch(function(errMsg) {
          alert('Add region failed!');
      });
  };

  $scope.removeRegion = (id) => {
      serviceFilter.removeRegion(id).then(function(response) {
        $scope.getAllRegion();
      }).catch(function(errMsg) {
          console.log('remove region failed!');
      });
  }
  $scope.getAllRegion();

  //////////////////////////ADMIN CONTRACTS CONTROL//////////////////////////

  $scope.getAllContract = () => {
      serviceFilter.getAllContract().then(function(response) {
          $scope.contracts = response.data;
      }).catch(function(errMsg) {
          console.log('show school failed!');
      });
  }

  $scope.addContract = () => {
      serviceFilter.addContract($scope.contract).then(function(response) {
        $scope.getAllContract();
      }).catch(function(errMsg) {
          alert('Add contract failed!');
      });
  };

  $scope.removeContract = (id) => {
      serviceFilter.removeContract(id).then(function(response) {
        $scope.getAllContract();
      }).catch(function(errMsg) {
          console.log('remove contract failed!');
      });
  }
  $scope.getAllContract();

  //////////////////////////ADMIN FIELDS CONTROL//////////////////////////

  $scope.getAllField = () => {
      serviceFilter.getAllField().then(function(response) {
          $scope.fields = response.data;
      }).catch(function(errMsg) {
          console.log('show school failed!');
      });
  }

  $scope.addField = () => {
    console.log($scope.field);
      serviceFilter.addField($scope.field).then(function(response) {
        $scope.getAllField();
      }).catch(function(errMsg) {
          alert('Add contract failed!');
      });
  };

  $scope.removeField = (id) => {
      serviceFilter.removeField(id).then(function(response) {
        $scope.getAllField();
      }).catch(function(errMsg) {
          console.log('remove contract failed!');
      });
  }
  $scope.getAllField();


}]);
