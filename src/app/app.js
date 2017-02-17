const app = angular.module('app', ['ui.router', 'ui.bootstrap','checklist-model', 'angularMoment']);

app.run(function(amMoment) {
    amMoment.changeLocale('fr');
});
