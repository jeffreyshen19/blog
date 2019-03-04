d3.selectAll(".line-chart").each(function(d, i){
  console.log(this.dataset);
  console.log(d3.select(this));
});

// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.timeParse("%Y-%m-%d");

// Set the ranges
var	x = d3.scaleTime().range([0, width]);
var	y = d3.scaleLinear().range([height, 0]);

// Define the axes
// var	xAxis = d3.svg.axis().scale(x)
// 	.orient("bottom").ticks(5);
//
// var	yAxis = d3.svg.axis().scale(y)
// 	.orient("left").ticks(5);

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// Define the line
var	valueline = d3.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.average_prop_unique_words); });

// Adds the svg canvas
var	svg = d3.select(".line-chart")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("/data/mumble_rap/lyricalness.csv").then(function(data) {

  data.forEach(function(d){
    d.date = parseDate(d.date);
    d.average_prop_unique_words = parseFloat(d.average_prop_unique_words);
  });


  	// Scale the range of the data
  	x.domain(d3.extent(data, function(d) { return d.date; }));
  	y.domain([0, d3.max(data, function(d) { return d.average_prop_unique_words; })]);

  	// Add the valueline path.
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

});
