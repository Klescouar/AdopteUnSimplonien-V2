app.filter('selectFilter', function(){
  const filter = (items, exclVal1, exclVal2) => {
    const checkItem = (item) => {
      return (item != exclVal1) && (item != exclVal2)
    };
    return items.filter(checkItem);
  };
  return filter;
});
