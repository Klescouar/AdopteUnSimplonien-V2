app.controller('profilUserEntreprise',['$http', '$scope', '$rootScope', 'AuthService', '$state', '$window', 'serviceStudent', function($http, $scope, $rootScope, AuthService, $state, $window, serviceStudent) {

	$scope.member = AuthService.user();
	console.log($scope.member)
    }    
]);
