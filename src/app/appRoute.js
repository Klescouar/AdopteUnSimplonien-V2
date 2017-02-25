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
  .state('confirmMail', {
    url: '/confirm/email/:token',
    views:{
     'home':{
      templateUrl: 'app/views/login.html',
      controller: 'loginCtrl'
     }
    }
  })
  .state('sendPass', {
    url: '/sendPass',
    views:{
     'home':{
      templateUrl: 'app/views/sendPassForReset.html',
      controller: 'sendPassForResetCtrl'
     }
    }
  })
  .state('resetPass', {
    url: '/reset/password/:token',
    views:{
     'home':{
      templateUrl: 'app/views/resetPass.html',
      controller: 'resetPassCtrl'
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
          const role = AuthService.userRole();
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
        const role = AuthService.userRole();
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
  .state('admin.home', {
    url: '/home',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/BO-home.html',
      }
    }
  })
  .state('admin.waitingCard', {
    url: '/waitingCard',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/waiting-card.html',
        controller: 'waitingCardCtrl'
      }
    }
  })
  .state('admin.createAccount', {
    url: '/createAccount',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/create-account.html',
        controller: 'createAccountCtrl'
      }
    }
  })
  .state('admin.csv', {
    url: '/csv',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/csv.html',
        controller: 'csvCtrl'
      }
    }
  })
  .state('admin.deleteUser', {
    url: '/deleteUser',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/delete-user.html',
        controller: 'deleteUserCtrl'
      }
    }
  })
  .state('admin.deleteCard', {
    url: '/deleteCard',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/delete-card.html',
        controller: 'deleteCardCtrl'
      }
    }
  })
  .state('admin.handleFilter', {
    url: '/handleFilter',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/handle-filter.html',
        controller: 'handleFilterCtrl'
      }
    }
  })
  .state('admin.handlePromo', {
    url: '/handlePromo',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/handle-promo.html',
        controller: 'handlePromoCtrl'
      }
    }
  })
  .state('admin.createCard', {
    url: '/createCard',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/create-card.html',
        controller: 'createCardCtrl'
      }
    }
  })
  .state('admin.modifyCard', {
    url: '/modifyCard/:id',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/modify-card.html',
        controller: 'modifyCardCtrl'
      }
    }
  })
  .state('admin.changeAdminPass', {
    url: '/changeAdminPass',
    views:{
      'admin_dashboard':{
        templateUrl: 'app/views/BO-views/changeAdminPass.html',
        controller: 'changeAdminPassCtrl'
      }
    }
  })
  .state('profilUserStudent', {
    url: '/dashboard/student',
    views:{
     'home':{
      templateUrl: 'app/views/user.html',
      controller: 'profilsUserCtrl',
      resolve:{
       function(AuthService, $state){
        const role = AuthService.userRole();
        if (role != 'Simplonien') {
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
  .state('profilUserRecruiter', {
    url: '/dashboard/recruiter',
    views:{
     'home':{
      templateUrl: 'app/views/profilUserEntreprise.html',
      controller: 'profilUserEntreprise',
      resolve:{
       function(AuthService, $state){
        const role = AuthService.userRole();
        console.log(role);
        if (role != 'Recruteur') {
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
