/*
  CHART.js
  Parent class for all charts
*/

function Chart(selector, config) {
  this.charts = Array.apply(null, Array(d3.selectAll(selector).size())); // Array holding all chart data

  /*
    Draws a single graph
  */

  this.drawChart = function(chart, dataset, data){
    // Statics
    var	margin = {top: 5, right: 20, bottom: 20, left: 65};
    if(config.rotatedText) margin.bottom = 70;
    var	padding = {top: 40, right: 20, bottom: 40, left: 20};
    var offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2;

    // Set dimensions of graph
    var width = d3.select("#body").node().offsetWidth - margin.left - margin.right - padding.left - padding.right + 2 * offset,
        height = (dataset.height || 300) - margin.top - margin.bottom;

    // Set the ranges
    var	x = window.d3[config.xScale]().range([0, width]),
        y = window.d3[config.yScale]().range([height, 0]);

    // Define axes
    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y);

    if(config.yAxisFormat) yAxis.tickFormat(config.yAxisFormat);

    // Set ticks responsively
    var body_width = d3.select("body").node().offsetWidth;
    config.setTicks(xAxis, body_width);

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
    if(config.domain) x.domain(config.domain(data, dataset.xcol));
    else x.domain(xextent);
    y.domain([0, ymax]);

    // Render data
    dataset.ycols.split(",").forEach(function(ycol, i){
      config.renderData(svg, data, x, y, dataset.xcol, ycol, dataset.linecolors.split(",")[i], width, height);
    });

    // Add the X Axis
    if(config.rotatedText) svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.5em")
        .attr("transform", "rotate(-30)");
    else svg.append("g")
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

    var ycols = dataset.ycols.split(","),
        colors = dataset.linecolors.split(","),
        labels = dataset.linelabels.split(",");

    // Add tooltip and tooltip line
    chart.append("div")
      .attr("class", "tooltip hidden");

    if(config.useTooltipLine) svg.append("line")
      .attr("class", "tooltip-line hidden")
      .attr("x1", x(xextent[0]))
      .attr("y1", y(0))
      .attr("x2", x(xextent[0]))
      .attr("y2", y(ymax))
      .style("stroke", "black")
      .style("stroke-width", "1")
      .style("stroke-dasharray", "5,5");

    var tooltip = chart.select(".tooltip"),
        tooltipLine;

    if(config.useTooltipLine) tooltipLine = chart.select(".tooltip-line");

    var bisect = d3.bisector(function(d){ return d[dataset.xcol]; }).right;

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
        if(config.useTooltipLine) tooltipLine.attr("x1", x(datum[dataset.xcol]))
          .attr("x2", x(datum[dataset.xcol]))
          .classed("hidden", false);

        tooltip.classed("hidden", false)
          .html("<strong>" + config.formatTooltip(datum[dataset.xcol]) + "</strong><br>" + ycols.map(function(d, i){
            return "<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:" + colors[i] + "'></div>" + labels[i] + ": " + datum[d].toFixed(2) + "</div>";
          }).join(""))
          .style("left", config.positionTooltip(mouse, tooltip, margin, width, height, offset, x, y).left + "px")
          .style("top", config.positionTooltip(mouse, tooltip, margin, width, height, offset, x, y).top + "px");
      }
    }).on("mouseout", function(d){
      tooltip.classed("hidden", true);
      if(config.useTooltipLine) tooltipLine.classed("hidden", true);
    });

  };

  /*
    Refreshes all charts on resize
  */
  this.redraw = function(){
    charts = this.charts;
    drawChart = this.drawChart;
    d3.selectAll(selector).each(function(d, i){
      drawChart(d3.select(this), this.dataset, charts[i]);
    });
  };

  /*
    Initializes all data and charts on load.
  */
  this.initialize = function(){
    //Load all data first
    var csv = [];
    d3.selectAll(selector).each(function(d, i){
      if(csv.indexOf(this.dataset.csv) == -1) csv.push(this.dataset.csv);
    });

    var promises = [];
    csv.forEach(function(d, i){
      promises.push(d3.csv(d));
    });

    var charts = this.charts;
    var drawChart = this.drawChart;

    Promise.all(promises).then(function(values) {
      var csvData = values.map(function(data, i){
        return {
          "csv": csv[i],
          "data": data
        };
      });

      // Iterate through all charts
      d3.selectAll(selector).each(function(d, i){
        var chart = d3.select(this),
            dataset = this.dataset;

        var data = null;
        for(var j = 0; j < csvData.length; j++){
          if(csvData[j].csv == dataset.csv) {
            data = JSON.parse(JSON.stringify(csvData[j].data));
            break;
          }
        }

        charts[i] = data.map(function(d){
          d[dataset.xcol] = config.parseX(d[dataset.xcol]);
          dataset.ycols.split(",").forEach(function(ycol){
            d[ycol] = parseFloat(d[ycol]);
          });
          return d;
        }); //Save data so it doesn't need to be loaded each time.
        drawChart(chart, dataset, charts[i]);
      });
    });
  };

}

//TODO: only one intiialize for all charts
