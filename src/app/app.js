const app = angular.module('app', ['ui.router', 'ui.bootstrap','checklist-model', 'angularMoment', 'ngMaterial']);

app.run(function(amMoment) {
    amMoment.changeLocale('fr');
});
