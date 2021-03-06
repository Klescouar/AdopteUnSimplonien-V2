app.service("serviceStudent", function($http, API_ENDPOINT) {

    this.addStudentFromAdmin = function(dataStudent) {
        return $http.post(API_ENDPOINT.url + '/backOffice/addStudentFromAdmin', dataStudent).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.addStudent = function(dataStudent) {
        return $http.post(API_ENDPOINT.url + '/backOffice/addStudent', dataStudent).then((response) => {
            return response;
        }, function(error) {
            return error;
        });
    };

    this.getAllStudent = function() {
        return $http.get(API_ENDPOINT.url + '/backOffice/infoStudent').then((response) => {
            return response;
        }, function(err) {
            return error;
        });
    };

    this.getStudentById = function(id) {
        return $http.get(API_ENDPOINT.url + '/backOffice/infoStudent/' + id).then((response) => {
            return response;
        }, (err) => {
            return error;
        });
    };

    this.getStudentByMemberId = function(id) {
        return $http.get(API_ENDPOINT.url + '/backOffice/infoStudent/fromMember/' + id).then((response) => {
            return response;
        }, (err) => {
          console.log(err);
            return error;
        });
    };

    this.studentVerified = function(id) {
        return $http.put(API_ENDPOINT.url + '/backOffice/update/' + id).then((response) => {
            return response;
        }, function(err) {
            return error;
        });
    };

    this.removeStudent = function(id) {
        return $http.delete(API_ENDPOINT.url + '/backOffice/removeStudent/' + id).then((response) => {
          console.log(response);
            return response;
        }, function(err) {
            return error;
        });
    };

    this.removeStudentFromUser = function(id) {
        return $http.delete(API_ENDPOINT.url + '/backOffice/removeStudentFromUser/' + id).then((response) => {
          console.log(response);
            return response;
        }, function(err) {
            return error;
        });
    };

    this.removeStudentPhoto = function(photo) {
        return $http.delete(API_ENDPOINT.url + '/backOffice/removeStudentPhoto/' + photo).then((response) => {
          console.log(response);
            return response;
        }, function(err) {
            return error;
        });
    };

    this.updateStudent = function(id, newInfos) {
        return $http.put(API_ENDPOINT.url + '/backOffice/update/' + id, newInfos).then((response) => {
            return response;
        }, function(err) {
            return error;
        });
    };

});
