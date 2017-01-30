app.service("serviceApi", function($http, API_ENDPOINT) {

    this.searchResult = {
        maxLangage: 3,
        maxContrat: 5,
        Langage: [],
        Ville: "",
        Contrat: [],
    };

    // this.schools = [{
    //     ville: 'Montreuil',
    //     active: false,
    // },{
    //     ville: 'Sarcelles',
    //     active: false,
    // },{
    //     ville: 'Paris 20',
    //     active: false,
    // },{
    //     ville: 'Aulnay-Sous-Bois',
    //     active: false,
    // },{
    //     ville: 'Clichy-Sous-Bois',
    //     active: false,
    // }, ];
    //
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
    //
    //
    // this.langages = [{
    //     type: 'Javascript',
    //     active: false,
    // }, {
    //     type: 'HTML/CSS',
    //     active: false,
    // }, {
    //     type: 'PHP',
    //     active: false,
    // }, {
    //     type: 'Angular',
    //     active: false,
    // }, {
    //     type: 'REACT',
    //     active: false,
    // }, {
    //     type: 'Typescript',
    //     active: false,
    // }, {
    //     type: 'Jquery',
    //     active: false,
    // }, {
    //     type: 'PHP',
    //     active: false,
    // }, {
    //     type: 'Design',
    //     active: false,
    // }, {
    //     type: 'JAVA',
    //     active: false,
    // }, {
    //     type: 'C#',
    //     active: false,
    // }, {
    //     type: 'UI/UX',
    //     active: false,
    // }, {
    //     type: 'Ruby',
    //     active: false,
    // }, {
    //     type: 'Responsive',
    //     active: false,
    // }, {
    //     type: 'Node',
    //     active: false,
    // }, {
    //     type: 'Meteor',
    //     active: false,
    // }, {
    //     type: 'Git',
    //     active: false,
    // }, ];
    //
    //
    // this.contrats = [{
    //     type: 'CDD',
    //     active: false,
    // }, {
    //     type: 'CDI',
    //     active: false,
    // }, {
    //     type: 'Contrat Pro',
    //     active: false,
    // }, {
    //     type: 'Stage',
    //     active: false,
    // }, {
    //     type: 'Freelance',
    //     active: false,
    // }, ];

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
