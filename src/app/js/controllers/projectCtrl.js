app.controller('projectCtrl', ['$scope', '$http', 'serviceFilter', '$timeout', '$window', function($scope, $http, serviceFilter, $timeout, $window){
    $scope.showTitle = true;
    $scope.showSimplon = true;

     angular.element($window).bind("scroll", (e) => {
        if(window.pageYOffset > 450){
            $scope.showTitle = false;
        }else if(window.pageYOffset < 450){
            $scope.showTitle = true;
        }
        if (window.pageYOffset > 1000) {
             $scope.showSimplon = false;
         }
         else if (window.pageYOffset < 1000) {
           $scope.showSimplon = true;
         }
         $scope.$apply(() => {});
     });

        $scope.setFlip = () => {

            document.querySelector('#flip-toggle').classList.toggle('hover');
        }
}]);
