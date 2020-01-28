---
---

{% include_relative charts/Chart.js %}
{% include_relative charts/bar_chart.js %}
{% include_relative charts/box_plot.js %}

bar_chart.initialize();
box_plot.initialize();
var resizeId;
d3.select(window).on('resize', function(){
  //Interval so it only calls functions once per resize
  resizeId = setTimeout(function(){
    bar_chart.redraw();
    box_plot.redraw();
  }, 500);
});
