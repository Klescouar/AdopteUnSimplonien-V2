app.service("serviceFilter", function($http, API_ENDPOINT) {

    this.searchResult = {
        maxLangage: 3,
        maxContrat: 5,
        Langage: [],
        Ville: "",
        Contrat: [],
    };

    this.themes = [{
        name: 'Promo',
        active: true,
    }, {
        name: 'Langage',
        active: false,
    }, {
        name: 'Contrat',
        active: false,
    }];


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
});
