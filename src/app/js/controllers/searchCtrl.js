app.controller('searchCtrl', ['$scope', '$http', 'serviceFilter', 'serviceStudent', function($scope, $http, serviceFilter, serviceStudent){
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

console.log($scope.noFilter)
    //////////////////////HANDLE FILTER/////////////////////

    const filterLangage = (firstFilter, langages) => {
        const nameSpecialite = ['SpecialiteUn', 'SpecialiteDeux', 'SpecialiteTrois'];
        const nbLangage = langages.length;
        let langage3 = [];
        let langage2 = [];
        let langage1 = [];

        angular.forEach(firstFilter, (value) => {
            if (nbLangage > 0) {
                let maitrise = 0;
                angular.forEach(nameSpecialite, (val) => {
                    if (value[val] === langages[0] || value[val] === langages[1] || value[val] === langages[2]) {
                        ++maitrise;
                    }
                });

                switch (maitrise) {
                    case 3:
                        langage3.push(value);
                        break;
                    case 2:
                        langage2.push(value);
                        break;
                    case 1:
                        langage1.push(value);
                        break;
                    default:
                        break;
                }
            } else {
                langage1.push(value);
            }
        });

        return [...langage3, ...langage2, ...langage1];
    }

    const searchFilter = () => {
        $scope.data = [];

        const {Langage, Region, Contrat} = $scope.searchResult;
        let contrat5=[], contrat4=[], contrat3=[], contrat2=[], contrat1=[];

        angular.forEach($scope.cardFull, (value, key) => {
          if (Region === '' || Region === value.region) {
            if (Contrat.length > 0) {
              let contratOk = 0;
              angular.forEach(value.Contrat, (dataVal) => {
                angular.forEach(Contrat, (val) => {
                  if (val === dataVal) {
                    ++contratOk;
                  }
                })
              })
              switch (contratOk) {
                case 1:
                  contrat1.push(value);
                  break;
                case 2:
                  contrat2.push(value);
                  break;
                case 3:
                  contrat3.push(value);
                  break;
                case 4:
                  contrat4.push(value);
                  break;
                case 5:
                  contrat5.push(value);
                  break;
              }
            } else {
              contrat1.push(value);
            }
          }
        });
        let firstFilter = [...contrat5,...contrat4,...contrat3,...contrat2,...contrat1];
        $scope.data = filterLangage(firstFilter, Langage);
    };

    searchFilter();


    serviceStudent.getAllStudent().then((res) => {
      $scope.loading = false;
      $scope.data = res.data;
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

    $scope.filterInput = () => {
      let data = [];
      const searchInput = $scope.searchStudent.split(' ');
      let regex = '^';
      angular.forEach(searchInput, (val) => {
        regex += `(?=.*${val.toLowerCase()})`;
      })
      regex += '.*$';
      regex = new RegExp(regex);

      angular.forEach($scope.cardFull, (studentVal) => {
        const search = `${studentVal.nom} ${studentVal.prenom} ${studentVal.ville} ${studentVal.SpecialiteUn} ${studentVal.SpecialiteDeux} ${studentVal.SpecialiteTrois}`;
        if (regex.test(search.toLowerCase())) {
          data.push(studentVal);
        }
      });

        $scope.data = data;
    }


    $scope.changeFilterRegion = function(){
        if (this.region.active === true) {
            this.region.active = false;
            $scope.searchResult.Region = "";
        } else {
            if ($scope.searchResult.Region.length === 0) {
                this.region.active = true;
                $scope.searchResult.Region = this.region.name;
            } else if ($scope.searchResult.Region.length > 0) {
                for (let i = 0; i < $scope.regions.length; i++) {
                    $scope.regions[i].active = false;
                    this.region.active = true;
                    $scope.searchResult.Region = this.region.name;
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
        for (let i = 0; i < $scope.regions.length; i++) {
            if ($scope.regions[i].name === $scope.searchResult.Region) {
                $scope.regions[i].active = false;
            }
        }
        $scope.searchResult.Region = "";
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

    $scope.getAllRegion = () => {
        serviceFilter.getAllRegion().then(function(response) {
            $scope.regions = response.data;
            $scope.regions.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get regions failed!');
        });
    }
    $scope.getAllRegion();

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
