app.controller('profilCtrl', ['$scope', 'serviceStudent', '$stateParams', function($scope, serviceStudent, $stateParams){
    $scope.contactStud = 1;
    $scope.verifChamps = false;
    const id = $stateParams.student;

    serviceStudent.getStudentById(id).then((res) => {
        $scope.student = res.data;
    }, (err) => {
        console.log("Error");
    })

}]);
