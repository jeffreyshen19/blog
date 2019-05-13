---
---

{% include_relative charts/d3.min.js %}
{% include_relative charts/connection_graph.js %}

initializeConnectionGraph();
var resizeId;
d3.select(window).on('resize', function(){
  //Interval so it only calls functions once per resize
  resizeId = setTimeout(function(){
    resizeConnectionGraph();
  }, 500);
});
