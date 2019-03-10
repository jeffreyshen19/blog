/*
  BAR_CHART.js
  Plots a bar chart
*/

var bar_chart = new Chart(".x-schart", {
  "parseX": function(x){return x;},
  "xScale": "scaleBand",
  "yScale": "scaleLinear",
  "setTicks": function(xAxis, width){
    // if(width < 400) xAxis.ticks(d3.timeYear.every(8));
    // else if(width < 800) xAxis.ticks(d3.timeYear.every(4));
    // else xAxis.ticks(d3.timeYear.every(2));
  },
  "renderData": function(svg, data, x, y, xcol, ycol, color, width, height){
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .style("fill", color)
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[xcol]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[ycol]); })
        .attr("height", function(d) { return height - y(d[ycol]); });
  },
  "useTooltipLine": false,
  "positionTooltip": function(mouse, tooltip, margin, width, height, offset, x, y){
    console.log(y(0));
    return {
      "left": (20 + mouse[0] + tooltip.node().offsetWidth > width + margin.left + margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - offset: mouse[0] + 10 - offset),
      "top": y(0) - tooltip.node().offsetHeight + margin.top + 24,
    };
  },
  "formatTooltip": d3.timeFormat("%b %e, %Y"),
});
