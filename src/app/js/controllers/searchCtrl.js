app.controller('searchCtrl', ['$scope', '$http', 'serviceApi', function($scope, $http, serviceApi){
    $scope.schools = serviceApi.schools;
    $scope.contrats = serviceApi.contrats;
    $scope.langages = serviceApi.langages;
    $scope.themes = serviceApi.themes;
    $scope.searchResult = serviceApi.searchResult;

    console.log('ON START:' + $scope.searchResult.Ville);



    $scope.loading = true;

    // Comparaison entre les cards et les filtres sélectionné par l'utilisateur et restitution des cards filtrés.
    const searchFilter = () => {
      console.log('ON FILTER' + $scope.searchResult.Ville);
        $scope.data = [];

        // Stockage des infos de searchResult (l'objet où sont stocké les filtres sélectionnés) dans des variables indépendantes.
        const lang1 = typeof $scope.searchResult.Langage[0] !== 'undefined' ? $scope.searchResult.Langage[0] : '';
        const lang2 = typeof $scope.searchResult.Langage[1] !== 'undefined' ? $scope.searchResult.Langage[1] : '';
        const lang3 = typeof $scope.searchResult.Langage[2] !== 'undefined' ? $scope.searchResult.Langage[2] : '';
        const ville = typeof $scope.searchResult.Ville !== 'undefined' ? $scope.searchResult.Ville : '';
        const contrat1 = typeof $scope.searchResult.Contrat[0] !== 'undefined' ? $scope.searchResult.Contrat[0] : '';
        const contrat2 = typeof $scope.searchResult.Contrat[1] !== 'undefined' ? $scope.searchResult.Contrat[1] : '';
        const contrat3 = typeof $scope.searchResult.Contrat[2] !== 'undefined' ? $scope.searchResult.Contrat[2] : '';
        const contrat4 = typeof $scope.searchResult.Contrat[3] !== 'undefined' ? $scope.searchResult.Contrat[3] : '';
        const contrat5 = typeof $scope.searchResult.Contrat[4] !== 'undefined' ? $scope.searchResult.Contrat[4] : '';

        // On parcourt chaque card contenu dans la variable cardFull, on mets en place d'une STRING dans la variable 'recherche' contenant toutes les infos de la card afin de comparer celle ci avec les tags des variables ci dessus. Si la comparaison match, on push la card dans $scope.data et elle sera affichée dans le front.
        angular.forEach($scope.cardFull, (value, key) => {
            const recherche = value.Contrat + ' ' + value.SpecialiteUn + ' ' + value.SpecialiteDeux + ' ' + value.SpecialiteTrois + ' ' + value.ville;
            if (recherche.match("^(?=.*" + lang1 + ")(?=.*" + lang2 + ")(?=.*" + lang3 + ")(?=.*" + ville + ")(?=.*" + contrat1 + ")(?=.*" + contrat2 + ")(?=.*" + contrat3 + ")(?=.*" + contrat4 + ")(?=.*" + contrat5 + ")", "i")) {
                $scope.data.push(value);
            };
        });
    };

    searchFilter();

    // Récupération de l'api contenant les cards et toutes leurs infos.
    $http.get('/api/infoStudent').then(function(response) {
        console.log("I got the data I requested");
        $scope.loading =false;
        $scope.data = response.data;
        $scope.cardFull = response.data;
        searchFilter();
    })

    // Changer la view des onglets. Ville/Langage/Contrat.
    $scope.changeState = (item) => {
        if (window.innerWidth > 640) {
            $scope.themes.forEach(function(theme) {
                theme.active = false;
            });
            item.active = true;
        }
        if (window.innerWidth < 640 && item.active === true) {
            item.active = false;
        } else if (window.innerWidth < 640 && item.active === false) {
            $scope.themes.forEach(function(theme) {
                theme.active = false;
            });
            item.active = true;
        }
    };

    // Selectionner les tags correspondant aux villes.
    $scope.changeFilterSchool = function(){
        if (this.school.active === true) {
            this.school.active = false;
            $scope.searchResult.Ville = "";
        } else {
            if ($scope.searchResult.Ville.length === 0) {
                this.school.active = true;
                $scope.searchResult.Ville = this.school.ville;
            } else if ($scope.searchResult.Ville.length > 0) {
                for (let i = 0; i < $scope.schools.length; i++) {
                    $scope.schools[i].active = false;
                    this.school.active = true;
                    $scope.searchResult.Ville = this.school.ville;
                }
            }
        }
        searchFilter();
        console.log('ON CHANGE:' + $scope.searchResult.Ville);
    }

    $scope.changeFilter = function(array, limit, item){
        if (item.active) {
            item.active = false;
            const index = array.indexOf(item.type);
            if (index > -1) {
                array.splice(index, 1);
            }
        } else if (!item.active && array.length < limit) {
            item.active = true;
            array.push(item.type);
        }
        searchFilter();
    }

    // Pouvoir supprimmer un tag en cliquant sur la croix de l'icone dans le tableau de bord.
    $scope.deleteSchoolTag = function(){
        for (let i = 0; i < $scope.schools.length; i++) {
            if ($scope.schools[i].ville === $scope.searchResult.Ville) {
                $scope.schools[i].active = false;
            }
        }
        $scope.searchResult.Ville = "";
        searchFilter();
    };

    // Pouvoir supprimmer un tag en cliquant sur la croix de l'icone dans le tableau de bord.
    $scope.deleteTag = function(array, item, list){
        for (let i = 0; i < list.length; i++) {
            if (list[i].type === item) {
                list[i].active = false;
                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
        }
        searchFilter();
    };


    $(function() {
        const nav = $('.filterMain');
        if (nav.length) {
            const stickyNavTop = nav.offset().top + 4;
            $(window).scroll(function() {
                if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                    $('.filterMain').addClass('sticktotop');
                    $('.cardPage').addClass('marginToFix');
                } else {
                    $('.filterMain').removeClass('sticktotop');
                    $('.cardPage').removeClass('marginToFix');
                }
            });
        }
    });

}]);
