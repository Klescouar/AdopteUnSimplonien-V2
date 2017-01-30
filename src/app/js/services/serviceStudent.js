app.service("serviceStudent", function($http, API_ENDPOINT) {

    this.addStudent = function(dataStudent) {
        return $http.post(API_ENDPOINT.url + '/backOffice/addStudentFromAdmin', dataStudent).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllStudent = function() {
        return $http.get(API_ENDPOINT.url + '/backOffice/infoStudent').then((response) => {
            return response;
        }, function(err) {
            console.log("Error");
        });
    };

    this.getStudentById = function(id) {
        return $http.get('/api/backOffice/infoStudent/' + id).then((response) => {
            return response;
        }, (err) => {
            console.log("Error");
        });
    };

    this.getStudentByMemberId = function(id) {
        return $http.get('/api/backOffice/infoStudent/fromMember/' + id).then((response) => {
            return response;
        }, (err) => {
            console.log("Error");
        });
    };

    this.studentVerified = function(id) {
        return $http.put(API_ENDPOINT.url + '/backOffice/update/' + id).then((response) => {
            return response;
        }, function(err) {
            console.log("Error");
        });
    };

    this.removeStudent = function(id) {
        return $http.delete(API_ENDPOINT.url + '/backOffice/removeStudent/' + id).then((response) => {
            return response;
        }, function(err) {
            console.log("Error");
        });
    };

    this.updateStudent = function(id, newInfos) {
        console.log(newInfos);
        return $http.put(API_ENDPOINT.url + '/backOffice/update/' + id, newInfos).then((response) => {
            console.log(response);
            return response;
        }, function(err) {
            console.log("Error");
        });
    };

});
