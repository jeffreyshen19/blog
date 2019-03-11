/*
  BAR_CHART.js
  Plots a bar chart
*/

var bar_chart = new Chart(".bar-chart", {
  "parseX": function(x){return x;},
  "xScale": "scaleBand",
  "yScale": "scaleLinear",
  "setTicks": function(xAxis, width){
    xAxis.tickFormat(function(d){
      d = d.split(" ");
      return d[0].charAt(0) + ". " + d[1];
    });
  },
  "domain": function(data, xcol){
    return data.map(function(d) { return d[xcol]; });
  },
  "rotatedText": true,
  "yAxisFormat": d3.format(".2s"),
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
    return {
      "left": (20 + mouse[0] + tooltip.node().offsetWidth > width + margin.left + margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - offset: mouse[0] + 10 - offset),
      "top": y(0) - tooltip.node().offsetHeight + margin.top + 24,
    };
  },
  "formatTooltip": d3.timeFormat("%b %e, %Y"),
});
