---
---

{% include_relative charts/d3.min.js %}
{% include_relative charts/Chart.js %}
{% include_relative charts/bar_chart.js %}

bar_chart.initialize();
var resizeId;
d3.select(window).on('resize', function(){
  //Interval so it only calls functions once per resize
  resizeId = setTimeout(function(){
    bar_chart.redraw();
  }, 500);
});
