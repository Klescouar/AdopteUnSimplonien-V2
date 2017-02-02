app.controller('searchCtrl', ['$scope', '$http', 'serviceFilter', 'serviceStudent', function($scope, $http, serviceFilter, serviceStudent){
    $scope.schools = serviceFilter.schools;
    $scope.contrats = serviceFilter.contrats;
    $scope.langages = serviceFilter.langages;
    $scope.themes = serviceFilter.themes;
    $scope.searchResult = serviceFilter.searchResult;
    $scope.$emit('LOAD');
    $scope.$emit('UNLOAD');
    $scope.loading = true;
    const putActiveParameter = (item) => {
      return item.active = false;
    };


    //////////////////////HANDLE FILTER/////////////////////

    const searchFilter = () => {
        $scope.data = [];

        const lang1 = typeof $scope.searchResult.Langage[0] !== 'undefined' ? $scope.searchResult.Langage[0] : '';
        const lang2 = typeof $scope.searchResult.Langage[1] !== 'undefined' ? $scope.searchResult.Langage[1] : '';
        const lang3 = typeof $scope.searchResult.Langage[2] !== 'undefined' ? $scope.searchResult.Langage[2] : '';
        const ville = typeof $scope.searchResult.Ville !== 'undefined' ? $scope.searchResult.Ville : '';
        const contrat1 = typeof $scope.searchResult.Contrat[0] !== 'undefined' ? $scope.searchResult.Contrat[0] : '';
        const contrat2 = typeof $scope.searchResult.Contrat[1] !== 'undefined' ? $scope.searchResult.Contrat[1] : '';
        const contrat3 = typeof $scope.searchResult.Contrat[2] !== 'undefined' ? $scope.searchResult.Contrat[2] : '';
        const contrat4 = typeof $scope.searchResult.Contrat[3] !== 'undefined' ? $scope.searchResult.Contrat[3] : '';
        const contrat5 = typeof $scope.searchResult.Contrat[4] !== 'undefined' ? $scope.searchResult.Contrat[4] : '';

        angular.forEach($scope.cardFull, (value, key) => {
            const recherche = value.Contrat + ' ' + value.SpecialiteUn + ' ' + value.SpecialiteDeux + ' ' + value.SpecialiteTrois + ' ' + value.ville;
            if (recherche.match("^(?=.*" + lang1 + ")(?=.*" + lang2 + ")(?=.*" + lang3 + ")(?=.*" + ville + ")(?=.*" + contrat1 + ")(?=.*" + contrat2 + ")(?=.*" + contrat3 + ")(?=.*" + contrat4 + ")(?=.*" + contrat5 + ")", "i")) {
                $scope.data.push(value);
            };
        });
    };

    searchFilter();


    serviceStudent.getAllStudent().then((res) => {
      $scope.loading = false;
      $scope.data = res.data;
      console.log(res.data);
      $scope.cardFull = res.data;
      searchFilter();
    })

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

    $scope.changeFilterSchool = function(){
        if (this.school.active === true) {
            this.school.active = false;
            $scope.searchResult.Ville = "";
        } else {
            if ($scope.searchResult.Ville.length === 0) {
                this.school.active = true;
                $scope.searchResult.Ville = this.school.name;
            } else if ($scope.searchResult.Ville.length > 0) {
                for (let i = 0; i < $scope.schools.length; i++) {
                    $scope.schools[i].active = false;
                    this.school.active = true;
                    $scope.searchResult.Ville = this.school.name;
                }
            }
        }
        searchFilter();
    }

    $scope.changeFilter = function(array, limit, item){
        if (item.active) {
            item.active = false;
            const index = array.indexOf(item.name);
            if (index > -1) {
                array.splice(index, 1);
            }
        } else if (!item.active && array.length < limit) {
            item.active = true;
            array.push(item.name);
        }
        searchFilter();
    }


    //////////////////////HANDLE TAGS/////////////////////

    $scope.deleteSchoolTag = function(){
        for (let i = 0; i < $scope.schools.length; i++) {
            if ($scope.schools[i].name === $scope.searchResult.Ville) {
                $scope.schools[i].active = false;
            }
        }
        $scope.searchResult.Ville = "";
        searchFilter();
    };

    $scope.deleteTag = function(array, item, list){
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === item) {
                list[i].active = false;
                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
        }
        searchFilter();
    };


    //////////////////////GET FILTER/////////////////////

    $scope.getAllSchool = () => {
        serviceFilter.getAllSchool().then(function(response) {
            $scope.schools = response.data;
            $scope.schools.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get schools failed!');
        });
    }
    $scope.getAllSchool();

    $scope.getAllSkill = () => {
        serviceFilter.getAllSkill().then(function(response) {
            $scope.skills = response.data;
            $scope.skills.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get skills failed!');
        });
    }
    $scope.getAllSkill();

    $scope.getAllContract = () => {
        serviceFilter.getAllContract().then(function(response) {
            $scope.contracts = response.data;
            $scope.contracts.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get contracts failed!');
        });
    }
    $scope.getAllContract();




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
