app.controller('projectCtrl', ['$scope', '$http', 'serviceFilter', '$timeout', '$window', function($scope, $http, serviceFilter, $timeout, $window){
    $scope.showTitle = true;
    $scope.showSimplon = true;
    // var positionSimplonien = $("#simplonien").offset().top;
    // var positionSimplon = $("#simplon").offset().top;
    // console.log(positionSimplonien)
    // console.log(positionSimplon)
    //var screen = window.pageYOffset;
    //console.log(screen)


     angular.element($window).bind("scroll", (e) => {
        if(window.pageYOffset > 40){
            $scope.showTitle = false; 
        }else if(window.pageYOffset < 40){
            $scope.showTitle = true;  
        }
        if (window.pageYOffset > 600) {
             $scope.showSimplon = false;
         }
         else if (window.pageYOffset < 500) {
           $scope.showSimplon = true;
         }
         $scope.$apply(() => {});
     });



    // $scope.showDescription = false;
    // $scope.showDescription2 = false;

    // $timeout(() => {
    //     if (window.innerWidth < 640) {
    //         $scope.showDescription = true;
    //         $scope.showDescription2 = true;
    //     }
    // }, 70);

    // angular.element($window).bind("scroll", (e) => {
    //     if (window.pageYOffset > 40) {
    //         $scope.showDescription = true;
    //     }
    //     else if (window.pageYOffset < 40) {
    //       $scope.showDescription = false ;
    //     }
    //     if (window.pageYOffset > 600) {
    //         $scope.showDescription2 = true;
    //     }
    //     else if (window.pageYOffset < 500) {
    //       $scope.showDescription2 = false;
    //     }
    //     $scope.$apply(() => {});
    // });
}]);
