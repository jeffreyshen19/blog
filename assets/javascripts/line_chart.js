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
  var	margin = {top: 35, right: 20, bottom: 50, left: 65};
  var	padding = {top: 40, right: 20, bottom: 40, left: 20};

  // Set dimensions of graph
  var width = d3.select("#body").node().offsetWidth - margin.left - margin.right - padding.left - padding.right,
      height = (dataset.height || 300) - margin.top - margin.bottom;

  // Set the ranges
  var	x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);

  // Define axes
  var xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y);

  // Reset canvas
  chart.selectAll("*").remove();

  // Create canvas
  var	svg = chart
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Fit Domain
  x.domain(d3.extent(data, function(d) { return d[dataset.xcol]; }));
  y.domain([0, d3.max(data, function(d) {
    return Math.max(...dataset.ycols.split(",").map(function(ycol){
      return d[ycol];
    }));
  })]);

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
  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (20 - margin.top) + ")")
    .attr("class", "axis-label title")
    .text(dataset.title);

  // X Axis Label
  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 10) + ")")
    .attr("class", "axis-label")
    .text(dataset.xlabel);

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
