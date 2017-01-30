app.controller('signInUpCtrl', ['$scope', '$http', 'serviceFilter', function($scope, $http, serviceFilter){
    $scope.signToggle = 1;
    $scope.verifPass = true;

    // Fonction LOGIN
    $scope.loginPost = () => {
        // Stockage du pseudo et du password dans l'objet login.
        const login = {
            pseudo: $('#connectPseudo').val(),
            password: $('#connectMdp').val()
        };

        $http.get(serviceFilter.connect, login)
            .then(
                (response) => {
                    $scope.users = response.data;
                },
                (err) => {
                    console.log("Error");
                });
    };

    // Gestion des différentes views de la modal.
    $scope.logBox = () => {
        $scope.signToggle = 1;
    };


    $scope.signBox = () => {
        $scope.signToggle = 2;
    };

    $('#signInUp').on('hidden.bs.modal', () => {
        $scope.signToggle = 1;
    });

    // Créer un compte.
    $scope.createAccount = () => {
        // Vérification des MDP
        if ($('#mdp').val() !== $('#mdp-verif').val()) {
            $scope.verifPass = false;
        };
        // S'ils sont semblable on les stock dans l'objet DataUser.
        if ($('#mdp').val() === $('#mdp-verif').val()) {
            const dataUser = {
                pseudo: $('#pseudo').val(),
                password: $('#mdp').val()

            };
            // Envoie du pseudo et du password au server.
            $http.post(serviceFilter.createUser, dataUser)
                .then(
                    (response) => {
                        $scope.signToggle = 3;
                    },
                    (err) => {
                        console.log("Error");
                    }
                );
        }
    }
}]);
