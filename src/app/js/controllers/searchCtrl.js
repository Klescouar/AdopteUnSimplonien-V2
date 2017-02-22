app.controller('searchCtrl', ['$scope', '$http', 'serviceFilter', 'serviceStudent', 'moment', function($scope, $http, serviceFilter, serviceStudent, moment){
  $scope.contrats = serviceFilter.contrats;
  $scope.langages = serviceFilter.langages;
  $scope.themes = serviceFilter.themes;
  $scope.searchResult = {
      maxLangage: 3,
      maxContrat: 5,
      Langage: [],
      Region: "",
      Contrat: [],
      Dispo: ""
  };
  $scope.dispoTag = '';
  $scope.active = "";
  $scope.$emit('LOAD');
  $scope.$emit('UNLOAD');
  $scope.loading = true;
  const putActiveParameter = (item) => {
      return item.active = false;
  };
  const convertToDate = (item) => {
      return item.dispo = moment(item.dispo, "YYYY-MM-DD").format("DD/MM/YYYY");
  }

  //////////////////////HANDLE FILTER/////////////////////

  const filterLangage = (secondFilter, langages) => {
      const nameSpecialite = ['SpecialiteUn', 'SpecialiteDeux', 'SpecialiteTrois'];
      const nbLangage = langages.length;
      let langage3 = [];
      let langage2 = [];
      let langage1 = [];

      angular.forEach(secondFilter, (value) => {
          if (nbLangage > 0) {
              let maitrise = 0;
              angular.forEach(nameSpecialite, (val) => {
                  if (value[val] === langages[0] || value[val] === langages[1] || value[val] === langages[2]) {
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

      return [
          ...langage3,
          ...langage2,
          ...langage1
      ];
  }

  const filterContrats = (firstFilter, Contrat) => {
      let contrat5 = [],
          contrat4 = [],
          contrat3 = [],
          contrat2 = [],
          contrat1 = [];
      if (Contrat.length > 0) {
          angular.forEach(firstFilter, (value) => {
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
          })
          return [
              ...contrat5,
              ...contrat4,
              ...contrat3,
              ...contrat2,
              ...contrat1
          ]
      } else {
          return firstFilter;
      }
  }

  const searchFilter = () => {
      $scope.data = [];

      const {Langage, Region, Contrat, Dispo} = $scope.searchResult;
      let firstFilter = [];

      angular.forEach($scope.cardFull, (value, key) => {
          let studentDate = value.dispo.split('/');
          let studentDateTab = [
              parseInt(studentDate[2]),
              parseInt(studentDate[1]) - 1,
              parseInt(studentDate[0])
          ]
          if (Region === '' || Region === value.region) {
              if (Dispo === '') {
                  firstFilter.push(value);
              } else if (Dispo[1] < 3 && Dispo[0].diff(moment(studentDateTab), 'days') > 0) {
                  firstFilter.push(value);
              } else if (Dispo[1] === 3 && Dispo[0].diff(moment(studentDateTab), 'days') <= 0) {
                  firstFilter.push(value);
              }
          }
      });
      let secondFilter = filterContrats(firstFilter, Contrat);
      $scope.data = filterLangage(secondFilter, Langage);
  };

  searchFilter();

  serviceStudent.getAllStudent().then((res) => {
      $scope.loading = false;
      $scope.data = res.data;
      res.data.map(convertToDate);
      $scope.cardFull = res.data;
      searchFilter();
  });

  $scope.filterDate = (time) => {
      if ($scope.active !== time) {
          $scope.active = time;
          switch (time) {
              case "now":
                  $scope.searchResult.Dispo = [moment(), 0];
                  $scope.dispoTag = 'Dès maintenant'
                  break;
              case "one":
                  $scope.searchResult.Dispo = [
                      moment().add(1, 'month'),
                      1
                  ];
                  $scope.dispoTag = "Moins d'un mois"
                  break;
              case "two":
                  $scope.searchResult.Dispo = [
                      moment().add(2, 'month'),
                      2
                  ];
                  $scope.dispoTag = "Moins de deux mois"
                  break;
              case "three":
                  $scope.searchResult.Dispo = [
                      moment().add(3, 'month'),
                      3
                  ];
                  $scope.dispoTag = 'Plus de trois mois'
                  break;
          }

      } else if ($scope.active === time) {
          $scope.dispoTag = '';
          $scope.active = '';
          $scope.searchResult.Dispo = "";
      }
      searchFilter();
  };

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

  $scope.changeFilterRegion = function() {
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

  $scope.changeFilter = function(array, limit, item) {
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

  $scope.deleteSchoolTag = function() {
      for (let i = 0; i < $scope.regions.length; i++) {
          if ($scope.regions[i].name === $scope.searchResult.Region) {
              $scope.regions[i].active = false;
          }
      }
      $scope.searchResult.Region = "";
      searchFilter();
  };

  $scope.deleteDispoTag = () => {
      $scope.dispoTag = "";
      $scope.searchResult.Dispo = "";
      $scope.active = "";
      searchFilter();
  };

  $scope.deleteTag = function(array, item, list) {
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

  function getScrollbarWidth() {
      var outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      document.body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = "scroll";

      // add innerdiv
      var inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
  }

  $(function() {
      const nav = $('.filterMain');
      if (nav.length) {
          const stickyNavTop = nav.offset().top + 4;
          $(window).scroll(function() {
              if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                  $('.filterMain').addClass('sticktotop');
                  $('.cardPage').css("margin-left", getScrollbarWidth() + 284 + 'px');
              } else {
                  $('.filterMain').removeClass('sticktotop');
                  $('.cardPage').css("margin-left", '0px');
              }
          });
      }
  });

}]);
