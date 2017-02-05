app.controller('projectCtrl', ['$scope', '$http', 'serviceFilter', '$timeout', '$window', function($scope, $http, serviceFilter, $timeout, $window){
    $scope.showTitle = true;
    $scope.showSimplon = true;

     angular.element($window).bind("scroll", (e) => {
        if(window.pageYOffset > 350){
            $scope.showTitle = false; 
        }else if(window.pageYOffset < 350){
            $scope.showTitle = true;  
        }
        if (window.pageYOffset > 900) {
             $scope.showSimplon = false;
         }
         else if (window.pageYOffset < 900) {
           $scope.showSimplon = true;
         }
         $scope.$apply(() => {});
     });
}]);
