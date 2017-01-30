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

    this.addSkill = function(song) {
        return $http.post(API_ENDPOINT.url + '/addSkill', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSkill = function() {
        return $http.get(API_ENDPOINT.url + '/getAllSkill').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeSkill = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSkill/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };




    this.addSchool = function(song) {
        return $http.post(API_ENDPOINT.url + '/addSchool', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllSchool = function() {
        return $http.get(API_ENDPOINT.url + '/getAllSchool').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeSchool = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeSchool/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };




    this.addContract = function(song) {
        return $http.post(API_ENDPOINT.url + '/addContract', song).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllContract = function() {
        return $http.get(API_ENDPOINT.url + '/getAllContract').then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.removeContract = function(id) {
        return $http.delete(API_ENDPOINT.url + '/removeContract/' + id).then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };
});
