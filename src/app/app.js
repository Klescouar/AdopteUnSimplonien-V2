const app = angular.module('app', ['ui.router', 'ui.bootstrap','checklist-model', 'angularMoment', 'ngMaterial']);

  app.run(function(amMoment) {
      amMoment.changeLocale('fr');
  });

  app.config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
      };
      // Example of a French localization.
      $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin' , 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre'];
      $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', 'avril', 'mai', 'juin' , 'juil', 'août', 'sept', 'oct', 'nov', 'dec'];
      $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
      $mdDateLocaleProvider.firstDayOfWeek = 1;
      $mdDateLocaleProvider.msgCalendar = 'Calendrier';
      $mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';
  });
