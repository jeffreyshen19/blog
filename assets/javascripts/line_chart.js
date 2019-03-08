/*
  LINE_CHART.js
  Plots a continuous line chart
*/

var lineCharts = Array.apply(null, Array(d3.selectAll(".line-chart").size())); // Create an array to hold the data for each graph

/*
  Draws a single line chart
*/

function drawLineChart(chart, dataset, data){
  // Statics
  var	margin = {top: 5, right: 20, bottom: 20, left: 65};
  var	padding = {top: 40, right: 20, bottom: 40, left: 20};
  var offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2;

  // Set dimensions of graph
  var width = d3.select("#body").node().offsetWidth - margin.left - margin.right - padding.left - padding.right + 2 * offset,
      height = (dataset.height || 300) - margin.top - margin.bottom;

  // Set the ranges
  var	x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);

  // Define axes
  var xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y);

  // Set ticks responsively
  var body_width = d3.select("body").node().offsetWidth;
  if(body_width < 400) xAxis.ticks(d3.timeYear.every(8));
  else if(body_width < 800) xAxis.ticks(d3.timeYear.every(4));
  else xAxis.ticks(d3.timeYear.every(2));

  // Reset canvas
  chart.selectAll("*").remove();

  // Create canvas
  var	svg = chart
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("transform", "translate(-" + offset + "px,0px)")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Fit Domain
  var ymax = d3.max(data, function(d) {
    return Math.max(...dataset.ycols.split(",").map(function(ycol){
      return d[ycol];
    }));
  });
  var xextent = d3.extent(data, function(d) { return d[dataset.xcol]; });
  x.domain(xextent);
  y.domain([0, ymax]);

  // Add Line(s)
  dataset.ycols.split(",").forEach(function(ycol, i){
    var	valueline = d3.line()
      .x(function(d) { return x(d[dataset.xcol]); })
      .y(function(d) { return y(d[ycol]); });

    svg.append("path")
      .attr("class", "line")
      .style("stroke", dataset.linecolors.split(",")[i])
      .attr("d", valueline(data));
  });

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Chart title
  chart.insert("p", ":first-child")
    .html(dataset.title)
    .attr("class", "axis-label title");

  // X Axis Label
  chart.append("p")
    .attr("class", "axis-label")
    .style("text-align", "center")
    .html(dataset.xlabel);

  // Y Axis Label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "axis-label")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .text(dataset.ylabel);

  // Add legend if there are multiple lines
  if(dataset.ycols.split(",").length > 1){
    chart.append("div")
      .attr("class", "legend")
      .selectAll(".legend-label")
      .data(dataset.linelabels.split(",").map(function(e, i){
          return {
            "color": dataset.linecolors.split(",")[i],
            "label": e
          };
        }))
      .enter()
      .append('div')
        .attr("class", "legend-label")
        .html(function(d, i){
          return "<div class = 'bubble' style = 'background-color:" + d.color + "'></div><span>" + d.label + "</span>";
        });
  }

  /*
    TOOLTIP
  */

  // Add tooltip and tooltip line
  chart.append("div")
    .attr("class", "tooltip hidden");

  svg.append("line")
    .attr("class", "tooltip-line hidden")
    .attr("x1", x(xextent[0]))
    .attr("y1", y(0))
    .attr("x2", x(xextent[0]))
    .attr("y2", y(ymax))
    .style("stroke", "black")
    .style("stroke-width", "1")
    .style("stroke-dasharray", "5,5");

  var tooltipLine = chart.select(".tooltip-line"),
      tooltip = chart.select(".tooltip");

  var bisect = d3.bisector(function(d){ return d[dataset.xcol]; }).right;
  var ycols = dataset.ycols.split(","),
      colors = dataset.linecolors.split(","),
      labels = dataset.linelabels.split(",");

  var format = d3.timeFormat("%b %e, %Y");

  chart.select("svg").on("mousemove", function(){
    var mouse = d3.mouse(this),
        mouseX = x.invert(mouse[0] - margin.left),
        index = bisect(data, mouseX),
        datum = data[index];

    if(datum == null){
      tooltip.classed("hidden", true);
      tooltipLine.classed("hidden", true);
    }
    else{
      tooltipLine.attr("x1", x(datum[dataset.xcol]))
        .attr("x2", x(datum[dataset.xcol]))
        .classed("hidden", false);

      tooltip.classed("hidden", false)
        .html("<strong>" + format(datum[dataset.xcol]) + "</strong><br>" + ycols.map(function(d, i){
          return "<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:" + colors[i] + "'></div>" + labels[i] + ": " + datum[d].toFixed(2) + "</div>";
        }).join(""))
        .style("left", (20 + mouse[0] + tooltip.node().offsetWidth > width + margin.left + margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - offset: mouse[0] + 10 - offset) + "px")
        .style("top", y(0) - tooltip.node().offsetHeight + margin.top - 10 + "px");
    }
  }).on("mouseout", function(d){
    tooltip.classed("hidden", true);
    tooltipLine.classed("hidden", true);
  });

}

/*
  Initializes all data and charts on load.
*/

function initializeLineCharts(){
  // Iterate through all line charts
  d3.selectAll(".line-chart").each(function(d, i){
    var chart = d3.select(this),
        dataset = this.dataset;

    // Load data
    d3.csv(this.dataset.csv).then(function(data) {
      var	parseDate = d3.timeParse("%Y-%m-%d");

      data.forEach(function(d){
        d[dataset.xcol] = parseDate(d[dataset.xcol]);
        dataset.ycols.split(",").forEach(function(ycol){
          d[ycol] = parseFloat(d[ycol]);
        });
      });

      drawLineChart(chart, dataset, data);
      lineCharts[i] = data; //Save data so it doesn't need to be loaded each time.
    });
  });
}

/*
  Redraws all charts
*/

function redrawLineCharts(){
  // Iterate through all line charts
  d3.selectAll(".line-chart").each(function(d, i){
    drawLineChart(d3.select(this), this.dataset, lineCharts[i]);
  });
}
