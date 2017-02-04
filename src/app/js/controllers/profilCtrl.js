app.controller('profilCtrl', ['$scope', 'serviceStudent', 'serviceMailer', '$stateParams', function($scope, serviceStudent, serviceMailer, $stateParams){
    $scope.contactStud = 1;
    $scope.verifChamps = false;
    const id = $stateParams.student;

    $scope.dataMail = {
        sender: '',
        content: ''
    }

    serviceStudent.getStudentById(id).then((res) => {
      console.log(res.data);
        $scope.student = res.data;
    }, (err) => {
        console.log("Error");
    })

    $scope.sendMail = () => {
        let dataMail = {
            layout: 'profil',
            to: $scope.student.Mail,
            sender: $scope.dataMail.sender,
            content: $scope.dataMail.content
        }

        serviceMailer.sendMail(dataMail);
    }

}]);
