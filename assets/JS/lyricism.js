---
---

{% include_relative charts/d3.min.js %}
{% include_relative charts/Chart.js %}
{% include_relative charts/line_chart.js %}

line_chart.initialize();
var resizeId;
d3.select(window).on('resize', function(){
  //Interval so it only calls functions once per resize
  resizeId = setTimeout(function(){
    line_chart.redraw();
  }, 500);
});
