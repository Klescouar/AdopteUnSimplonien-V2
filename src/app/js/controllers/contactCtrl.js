app.controller('contactCtrl', ['$scope', '$http', 'serviceFilter', 'serviceMailer', '$window', function($scope, $http, serviceFilter, serviceMailer, $window){
    let htmlInfos = [];
    $scope.showForm = false;

    //////////////////////SEND MAIL FROM CONTACT FORM/////////////////////

    $scope.mail = {
        layout: 'contact',
        to: 'Test.project.simplon@gmail.com',
        name: '',
        entreprise: '',
        city: '',
        sender: '',
        phone: '',
        content: ''
    };

    $scope.sendMail = () => {
        serviceMailer.sendMail($scope.mail).then((res) => {
          console.log('send');
        });
    }


    //////////////////////GOOGLE MAP API/////////////////////

    const getInfo = (element) => {
      htmlInfos.push({
        latitude : element.latitude,
        longitude : element.longitude,
        html : '<div id="contentMap">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1>Simplon ' + element.name + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + element.adress + '</p>' +
        '<a target="_blank" href=" ' + element.website + ' ">Site Web</a> ' +
        '</div>' +
        '</div>'})
    };

    const getAllSchool = () => {
      serviceFilter.getAllSchool().then((res) => {
        $scope.schools = res.data;
        $scope.schools.map(getInfo);
        initialize();
      })
    }

    getAllSchool();


    function initialize() {
        const mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 11,
            center: {
                lat: 48.904607,
                lng: 2.357898
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        const newMapAdress = (element) => {
          const marker = new google.maps.Marker({
              position: {
                  lat: element.latitude,
                  lng: element.longitude
              },
              map: map
          });

          marker.addListener('click', () => {
              new google.maps.InfoWindow({content: element.html}).open(map, marker);
          });
        }

        htmlInfos.map(newMapAdress);

      }

    google.maps.event.addDomListener(window, 'load', initialize);

}]);
