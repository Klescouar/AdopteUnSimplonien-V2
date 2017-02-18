app.controller('projectCtrl', ['$scope', '$http', 'serviceFilter', '$timeout', '$window', function($scope, $http, serviceFilter, $timeout, $window){
    $scope.showTitle = true;
    $scope.showSimplon = true;
    $scope.descriptionFour = true;
    $scope.descriptionFive = true;

     angular.element($window).bind("scroll", (e) => {
        if(window.pageYOffset > window.innerHeight - (window.innerHeight/2)){
            $scope.showTitle = false;
        }else if(window.pageYOffset < window.innerHeight - (window.innerHeight/2)){
            $scope.showTitle = true;
        }
        if (window.pageYOffset > window.innerHeight * 2 - (window.innerHeight/2)) {
             $scope.showSimplon = false;
         }
         else if (window.pageYOffset < window.innerHeight * 2 - (window.innerHeight/2)) {
           $scope.showSimplon = true;
         }
         if (window.pageYOffset > window.innerHeight * 3 - (window.innerHeight/2)) {
             $scope.descriptionFour = false;
         }
         else if (window.pageYOffset < window.innerHeight * 3 - (window.innerHeight/2)) {
           $scope.descriptionFour = true;
         }
         if (window.pageYOffset > window.innerHeight * 4 - (window.innerHeight/2)) {
             $scope.descriptionFive = false;
         }
         else if (window.pageYOffset < window.innerHeight * 4 - (window.innerHeight/2)) {
           $scope.descriptionFive = true;
         }

         $scope.$apply(() => {});
     });

        $scope.setFlip = () => {

            document.querySelector('#flip-toggle').classList.toggle('hover');
        }
}]);
