
// app.directive('pwCheck', [function () {

//     return {
//         require: 'ngModel',
//         link: function (scope, elem, attrs, ctrl) {
//             console.log("couocu")
//             var firstPassword = '#' + attrs.pwCheck;
//             elem.add(firstPassword).on('keyup', function () {
//                 scope.$apply(function () {
//                     console.log(elem.val() === $(firstPassword).val());
//                     ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
//                 });
//             });
//         }
//     }
// }]);