var resizeId;
d3.select(window).on('resize', function(){
  //Interval so it only calls functions once per resize
  resizeId = setTimeout(function(){
    redrawLineCharts();
  }, 500);
});
