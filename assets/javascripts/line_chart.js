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
  var	margin = {top: 30, right: 20, bottom: 30, left: 50};
  var	padding = {top: 40, right: 20, bottom: 40, left: 20};

  // Set dimensions of graph
  var width = d3.select("#body").node().offsetWidth - margin.left - margin.right - padding.left - padding.right,
      height = 500 - margin.top - margin.bottom;

  // Set the ranges
  var	x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);

  // Define axes
  var xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y);

  // Define line(s)
  var	valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.average_prop_unique_words); });

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
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.average_prop_unique_words; })]);

  // Add Line(s)
  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

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
        d.date = parseDate(d.date);
        d.average_prop_unique_words = parseFloat(d.average_prop_unique_words);
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
