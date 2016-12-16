app.controller('contactCtrl', ['$scope', '$http', 'serviceApi', '$window', function($scope, $http, serviceApi, $window){
    $scope.schools = serviceApi.schools;
    $scope.showForm = false;

// Mise en place de la map Google
    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 16,
            center: {
                lat: 48.854491,
                lng: 2.435967
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        var marker = new google.maps.Marker({
            position: {
                lat: 48.854491,
                lng: 2.435967,
            },
            map: map,
            title: 'Hello World!',
        });
    }

    initialize();

    google.maps.event.addDomListener(window, 'load', initialize);

}]);
