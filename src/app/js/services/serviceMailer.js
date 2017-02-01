app.service("serviceMailer", function($http, API_ENDPOINT) {

    this.sendMail = function(dataMail) {
        return $http.post(API_ENDPOINT.url + '/contact/send', dataMail).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.sendMailForPass = function(data) {
        return $http.post(API_ENDPOINT.url + '/update/pass/', dataMail).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };
});
