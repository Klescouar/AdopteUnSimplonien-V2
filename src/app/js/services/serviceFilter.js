app.service("serviceFilter", function($http, API_ENDPOINT) {

    this.themes = [
        {
            name: 'Promo',
            active: true
        }, {
            name: 'Langage',
            active: false
        }, {
            name: 'Dispo',
            active: false
        }, {
            name: 'Contrat',
            active: false
        }
    ];

    //////////////////////SKILL REQUESTS/////////////////////////:

    this.addSkill = function(skills) {
        return $http.post(API_ENDPOINT.url + '/addSkill', skills).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSkill = function() {
        return $http.get(API_ENDPOINT.url + '/getAllSkill').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeSkill = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSkill/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    //////////////////////SCHOOL REQUESTS/////////////////////////:

    this.addSchool = function(schools) {
        return $http.post(API_ENDPOINT.url + '/addSchool', schools).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSchool = function() {
        return $http.get(API_ENDPOINT.url + '/getAllSchool').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeSchool = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSchool/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    //////////////////////CONTRACT REQUESTS/////////////////////////:

    this.addContract = function(contracts) {
        return $http.post(API_ENDPOINT.url + '/addContract', contracts).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllContract = function() {
        return $http.get(API_ENDPOINT.url + '/getAllContract').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeContract = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeContract/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    //////////////////////PROMOS REQUESTS/////////////////////////:

    this.addPromo = function(promo) {
        return $http.post(API_ENDPOINT.url + '/addPromo', promo).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllPromo = function() {
        return $http.get(API_ENDPOINT.url + '/getAllPromo').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removePromo = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removePromo/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    //////////////////////REGION REQUESTS/////////////////////////:

    this.addRegion = function(region) {
        return $http.post(API_ENDPOINT.url + '/addRegion', region).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllRegion = function() {
        return $http.get(API_ENDPOINT.url + '/getAllRegion').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeRegion = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeRegion/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    //////////////////////FIELD REQUESTS/////////////////////////:

    this.addField = function(field) {
        return $http.post(API_ENDPOINT.url + '/addField', field).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllField = function() {
        return $http.get(API_ENDPOINT.url + '/getAllField').then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeField = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeField/' + id).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };
});
