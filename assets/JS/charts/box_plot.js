/*
  BOX_PLOT.js
  Box and whisker plot
*/

var box_plot = new Chart(".box-plot", {
  "parseX": function(x){return x;},
  "xScale": "scaleLinear",
  "yScale": "scaleBand",
  "setTicks": function(xAxis, width){
    xAxis.tickFormat(d3.format(".2s"));
    if(width < 700) xAxis.ticks(4);
  },
  "ydomain": function(data, xcol){
    return data.map(function(d) { return d[xcol]; });
  },
  "margin": {
    top: 5, right: 20, bottom: 20, left: 130
  },
  "domain": function(data, xcol, dataset){
    var max = dataset.fivenum.split(",")[4];
    var ymax = d3.max(data, function(d) {
      return +d[max];
    });
    return [0, ymax];
  },
  "renderData": function(svg, data, x, y, xcol, ycol, color, width, height, chart, dataset){
    var fivenum = dataset.fivenum.split(",");
    svg.selectAll('g.box')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'box')
      .attr('transform', function(d){
        return "translate(" + x(d[fivenum[2]]) + "," + (y(d[xcol]) + 30) + ")"; //TODO
      })
      .each(function(d, i) {
        d3.select(this)
          .append('line')
          .attr('class', 'range')
          .attr('x1', x(d[fivenum[4]]) - x(d[fivenum[2]]))
          .attr('x2', x(d[fivenum[0]]) - x(d[fivenum[2]]))
          .attr('y1', 0)
          .attr('y2', 0)
          .style('stroke', 'black')
          .style('stroke-width', '4px');

        d3.select(this)
          .append('line')
          .attr('class', 'max')
          .attr('x1', x(d[fivenum[4]]) - x(d[fivenum[2]]))
          .attr('x2', x(d[fivenum[4]]) - x(d[fivenum[2]]))
          .attr('y1', -10)
          .attr('y2', 10)
          .style('stroke', 'black')
          .style('stroke-width', '4px');

        d3.select(this)
          .append('line')
          .attr('class', 'min')
          .attr('x1', x(d[fivenum[0]]) - x(d[fivenum[2]]))
          .attr('x2', x(d[fivenum[0]]) - x(d[fivenum[2]]))
          .attr('y1', -10)
          .attr('y2', 10)
          .style('stroke', 'black')
          .style('stroke-width', '4px');

        d3.select(this)
          .append('rect')
          .attr('class', 'range')
          .attr('x', x(d[fivenum[1]]) - x(d[fivenum[2]]))
          .attr('y', -10)
          .attr('height', 20)
          .attr('width', x(d[fivenum[3]]) - x(d[fivenum[1]]))
          .style('fill', 'white')
          .style('stroke', 'black')
          .style('stroke-width', '2px');

        d3.select(this)
          .append('line')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', -10)
          .attr('y2', 10)
          .style('stroke', 'darkgray')
          .style('stroke-width', '4px');
      });
  },
  "useTooltipLine": false,
  "useTooltip": false,
});
