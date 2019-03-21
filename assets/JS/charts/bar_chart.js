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
  "renderData": function(svg, data, x, y, xcol, ycol, color, width, height, chart, dataset){
    var tooltip = chart.select(".tooltip"),
        labels = dataset.linelabels.split(","),
        ycols = dataset.ycols.split(","),
        commas = d3.format(",.0f"),
        offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2;

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .style("fill", color)
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[xcol]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[ycol]); })
        .attr("height", function(d) { return height - y(d[ycol]); })
        .on("mousemove", function(d){
          var mouse = d3.mouse(this);
          tooltip
            .classed("hidden", false)
            .html("<strong>" + d[xcol] + "</strong><br>" + ycols.map(function(col, i){
                return "<div class = 'tooltip-label'>" + labels[i] + ": " + commas(d[col]) + "</div>";
            }).join(""))
            .style("left", (mouse[0] + tooltip.node().offsetWidth > width ? mouse[0] + 55 - tooltip.node().offsetWidth - offset: mouse[0] + 75 - offset) + "px")
            .style("top", mouse[1] + 50 + "px");
        })
        .on("mouseout", function(d){ tooltip.classed("hidden", true);});
  },
  "useTooltipLine": false,
  "positionTooltip": function(mouse, tooltip, margin, width, height, offset, x, y){
    return {
      "left": (20 + mouse[0] + tooltip.node().offsetWidth > width + margin.left + margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - offset: mouse[0] + 10 - offset),
      "top": y(0) - tooltip.node().offsetHeight + margin.top + 24,
    };
  }
});
