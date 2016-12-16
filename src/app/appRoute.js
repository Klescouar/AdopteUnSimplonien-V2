app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    views:{
     'home':{
      templateUrl: 'app/views/home.html'
     }
    }
  })
  .state('search', {
    url: '/search',
    views:{
     'home':{
      templateUrl: 'app/views/search.html',
      controller: 'searchCtrl'
     }
    }
  })
  .state('project', {
    url: '/project',
    views:{
     'home':{
      templateUrl: 'app/views/project.html',
      controller: 'projectCtrl'
     }
    }
  })
  .state('contact', {
    url: '/contact',
    views:{
     'home':{
      templateUrl: 'app/views/contact.html',
      controller: 'contactCtrl',
     }
    }
  })
  .state('login', {
    url: '/login',
    views:{
     'home':{
      templateUrl: 'app/views/login.html',
      controller: 'loginCtrl'
     }
    }
  })
  .state('signup', {
    url: '/signup',
    views:{
     'home':{
      templateUrl: 'app/views/signup.html',
      controller: 'registerCtrl'
     }
    }
  })
  .state('profil', {
    url: '/profil/:student',
    views:{
     'home':{
      templateUrl: 'app/views/profil.html',
      resolve:{
        function(AuthService, $state){
          var role = AuthService.userRole();
          if (role != 'Recruteur' && role != 'Simplonien' && role != 'Admin') {
            $state.go('login');
            return false;
          }else{
            return true;
          }
        }
      }
     }
    }
  })
  .state('admin', {
    url: '/admin',
    views:{
     'home':{
      templateUrl: 'app/views/backOffice.html',
      controller: 'boCtrl',
      resolve:{
       function(AuthService, $state){
        var role = AuthService.userRole();
        console.log(role);
        if (role != 'Admin') {
         $state.go('home');
         return false;
        }else{
         return true;
        }
       }
      }
     }
    }
  })
  .state('profilUser', {
    url: '/profilUser',
    views:{
     'home':{
      templateUrl: 'app/views/user.html',
      controller: 'profilsUserCtrl'
     }
    }
  })
  .state('profilUser.user', {
    url: '/user',
    views:{
     'user_dashboard':{
      templateUrl: 'app/views/dashboardProfilUser.html',
      controller: 'profilsUserCtrl'
     }
    }
  })
  $urlRouterProvider.otherwise('/home');
});



app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  AuthService.userRole();
  AuthService.user();
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, toState,fromState){
    if (!AuthService.isAuthenticated()) {
      AuthService.userRole();
      console.log(next.name);
    }
  });
});
