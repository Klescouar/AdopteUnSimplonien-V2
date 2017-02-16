// app.filter('selectFilter', function(){
//   const filter = (items, exclVal1, exclVal2) => {
//     const checkItem = (item) => {
//       return (item != exclVal1) && (item != exclVal2)
//     };
//     return items.filter(checkItem);
//   };
//   return filter();
// });
app.filter('selectFilter', function() {
    var filter = function(items, excludeVal1, excludeVal2) {
        var checkItem = function(item) {
            return (item != excludeVal1) && (item != excludeVal2);
        };

        return items.filter(checkItem);
    };

    return filter;
});
