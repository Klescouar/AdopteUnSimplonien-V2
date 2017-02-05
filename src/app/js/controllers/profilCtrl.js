app.controller('profilCtrl', ['$scope', 'serviceStudent', 'serviceMailer', '$stateParams', 'AuthService', function($scope, serviceStudent, serviceMailer, $stateParams, AuthService){
    $scope.contactStud = 1;
    $scope.verifChamps = false;
    const id = $stateParams.student;

    $scope.dataMail = {
        content: ''
    }

    $scope.memberInfo = AuthService.user();

    serviceStudent.getStudentById(id).then((res) => {
        $scope.student = res.data;
    }, (err) => {
        console.log("Error");
    })

    $scope.sendMail = () => {
        let dataMail = {
            layout: 'profil',
            to: $scope.student.Mail,
            sender: $scope.memberInfo.email,
            content: $scope.dataMail.content
        }

        serviceMailer.sendMail(dataMail);
    }

}]);
