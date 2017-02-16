app.service("serviceMailer", function($http, API_ENDPOINT) {

    this.sendMail = function(dataMail) {
        return $http.post(API_ENDPOINT.url + '/contact/send', dataMail).then((response) => {
          console.log(response);
            return response;
        }, function(error) {
            return error;
        });
    };

    this.sendMailForPass = function(dataMail) {
        return $http.post(API_ENDPOINT.url + '/sendmail/pass', dataMail).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };
});
