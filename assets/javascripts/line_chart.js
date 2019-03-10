/*
  LINE_CHART.js
  Plots a continuous line chart
*/

var line_chart = new Chart(".line-chart", {
  "parseX": d3.timeParse("%Y-%m-%d"),
  "xScale": "scaleTime",
  "yScale": "scaleLinear",
  "setTicks": function(xAxis, width){
    if(width < 400) xAxis.ticks(d3.timeYear.every(8));
    else if(width < 800) xAxis.ticks(d3.timeYear.every(4));
    else xAxis.ticks(d3.timeYear.every(2));
  },
  "renderData": function(svg, data, x, y, xcol, ycol, color){
    var	valueline = d3.line()
      .x(function(d) { return x(d[xcol]); })
      .y(function(d) { return y(d[ycol]); });

    svg.append("path")
      .attr("class", "line")
      .style("stroke", color)
      .attr("d", valueline(data));
  },
  "useTooltipLine": true,
  "positionTooltip": function(mouse, tooltip, margin, width, height, offset, x, y){
    console.log(y(0));
    return {
      "left": (20 + mouse[0] + tooltip.node().offsetWidth > width + margin.left + margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - offset: mouse[0] + 10 - offset),
      "top": y(0) - tooltip.node().offsetHeight + margin.top + 24,
    };
  },
  "formatTooltip": d3.timeFormat("%b %e, %Y"),
});
