const app = angular.module('app', ['ui.router', 'ui.bootstrap','checklist-model', 'angularMoment', 'ngMaterial']);

app.run(function(amMoment) {
    amMoment.changeLocale('fr');
});

app.config(function($mdDateLocaleProvider) {

    // Example of a French localization.
    $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin' , 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre'];
    $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', 'avril', 'mai', 'juin' , 'juil', 'août', 'sept', 'oct', 'nov', 'dec'];
    $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;

    // In addition to date display, date components also need localized messages
    // for aria-labels for screen-reader users.
    //
    // $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    //   return 'Semaine ' + weekNumber;
    // };

    $mdDateLocaleProvider.msgCalendar = 'Calendrier';
    $mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';

    // You can also set when your calendar begins and ends.
    // $mdDateLocaleProvider.firstRenderableDate = new Date(1776, 6, 4);
    // $mdDateLocaleProvider.lastRenderableDate = new Date(2012, 11, 21);
});
