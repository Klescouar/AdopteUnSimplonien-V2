app.controller('contactCtrl', ['$scope', '$http', 'serviceFilter', '$window', function($scope, $http, serviceFilter, $window){
    $scope.schools = serviceFilter.schools;
    $scope.showForm = false;

//////////////////////GOOGLE MAP API/////////////////////

    function initialize() {
        const mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 11,
            center: {
                lat: 48.904607,
                lng: 2.357898
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        const contentMontreuil = '<div id="contentMap">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1>Simplon Montreuil</h1>' +
        '<div id="bodyContent">' +
        '<p>55 Rue de Vincennes, 93100 Montreuil</p>' +
        '<a target="_blank" href="http://simplon.co/">Site Web</a> ' +
        '</div>' +
        '</div>';

        const contentSarcelles = '<div id="contentMap">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1>Simplon Sarcelles</h1>' +
        '<div id="bodyContent">' +
        '<p>18 avenue du 8 mai 1945 95200 Sarcelles</p>' +
        '<a target="_blank" href="http://simplon.co/">Site Web</a> ' +
        '</div>' +
        '</div>';

        const contentAulnay = '<div id="contentMap">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1>Simplon Aulnay-Sous-Bois</h1>' +
        '<div id="bodyContent">' +
        '<p>1 Rue Auguste Renoir 93600 Aulnay-sous-Bois</p>' +
        '<a target="_blank" href="http://simplon.co/">Site Web</a> ' +
        '</div>' +
        '</div>';
        const contentParis20 = '<div id="contentMap">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1>Simplon Paris 20ème</h1>' +
        '<div id="bodyContent">' +
        '<p>8 rue Serpollet 75020 Paris</p>' +
        '<a target="_blank" href="http://simplon.co/">Site Web</a> ' +
        '</div>' +
        '</div>';

        const infoMontreuil = new google.maps.InfoWindow({content: contentMontreuil});
        const infoSarcelles = new google.maps.InfoWindow({content: contentSarcelles});
        const infoAulnay = new google.maps.InfoWindow({content: contentAulnay});
        const infoParis = new google.maps.InfoWindow({content: contentParis20});

        const marker = new google.maps.Marker({
            position: {
                lat: 48.854491,
                lng: 2.435967
            },
            map: map
        });
        const marker2 = new google.maps.Marker({
            position: {
                lat: 48.9776739,
                lng: 2.372309399999949
            },
            map: map
        });
        const marker3 = new google.maps.Marker({
            position: {
                lat: 48.9527378,
                lng: 2.4901563999999325
            },
            map: map
        });
        const marker4 = new google.maps.Marker({
            position: {
                lat: 48.8607154,
                lng: 2.4110412999999653
            },
            map: map
        });

        marker.addListener('click', function() {
            infoMontreuil.open(map, marker);
        });
        marker2.addListener('click', function() {
            infoSarcelles.open(map, marker2);
        });
        marker3.addListener('click', function() {
            infoAulnay.open(map, marker3);
        });
        marker4.addListener('click', function() {
            infoParis.open(map, marker4);
        });
    }

    initialize();

    google.maps.event.addDomListener(window, 'load', initialize);

}]);
