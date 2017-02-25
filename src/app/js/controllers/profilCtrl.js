app.controller('profilCtrl', ['$scope', 'serviceStudent', 'serviceMailer', '$stateParams', 'AuthService', '$timeout',function($scope, serviceStudent, serviceMailer, $stateParams, AuthService,$timeout){
    $scope.contactStud = 1;
    $scope.verifChamps = false;
    $scope.sendMess = true;
    const id = $stateParams.student;

    $scope.dataMail = {
        content: ''
    }

    $scope.memberInfo = AuthService.user();

    serviceStudent.getStudentById(id).then((res) => {
        $scope.student = res.data;
        if ($scope.student.photo ==='') {
          $scope.student.photo = 'anonymous.png'
        }
    }, (err) => {
        console.log("Error");
    })

    $scope.sendMail = () => {
        if ($scope.dataMail.content != '') {
            $scope.sendMess = false;
              $timeout(function () {
              $scope.sendMess = true;
                }, 6000);
        let dataMail = {
            layout: 'profil',
            to: $scope.student.Mail,
            sender: $scope.memberInfo.email,
            content: $scope.dataMail.content
        }
            serviceMailer.sendMail(dataMail);
        }
    }

}]);
