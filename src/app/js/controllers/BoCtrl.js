app.controller('boCtrl', ['$scope','AuthService','$http','serviceFilter','$state','$timeout', 'serviceStudent', '$window', function($scope, AuthService, $http, serviceFilter, $state, $timeout, serviceStudent, $window) {

      $scope.memberRole = AuthService.userRole();
      
      // JQUERY
      $(document).ready(() => {
          $(() => {
              const nav = $('.container-nav-bo');
              if (nav.length) {
                  const stickyNavTop = nav.offset().top + 4;
                  $(window).scroll(() => {
                      if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                          $('.container-nav-bo').addClass('sticktotop');
                          $('.container-interface').addClass('marginToFix2');
                      } else {
                          $('.container-nav-bo').removeClass('sticktotop');
                          $('.container-interface').removeClass('marginToFix2');
                      }
                  });
              }
          });
      });

    }
]);
