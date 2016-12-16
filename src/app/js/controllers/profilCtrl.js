app.controller('profilCtrl', ['$scope', '$http', 'serviceApi', '$stateParams', function($scope, $http, serviceApi, $stateParams){
$scope.contactStud = 1;
$scope.verifChamps = false;


// VERIFICATION BEFORE MAIL SEND
$scope.contactStudent = () => {
    if ($('.inputMail').val().length > 0 && $('.textAreaMail').val().length > 0) {
        $scope.contactStud = 2;
    }
    else {
        $scope.verifChamps = true;
    }
}

console.log($stateParams.student);
// GET STUDENT ID
    let id = $stateParams.student;

// GET STUDENT INFOS
    $http.get('/api/backOffice/infoStudent/' + id)
        .then(
            function(response) {
                $scope.student = response.data;
            },
            function(err) {
                console.log("Error");
            }
        );


}]);
