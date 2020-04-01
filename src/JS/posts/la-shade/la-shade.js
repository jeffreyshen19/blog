import scroller from "/dist/JS/scrollytelling/scroller.js";

const margin = {top: 50, right: 15, bottom: 70, left: 55};
let width = document.getElementById("vis").offsetWidth - margin.left - margin.right - 20,
    height = document.getElementById("vis").offsetHeight - margin.top - margin.bottom;

let map, histogram, histogramData, currentHistogram = -1;

var scrollVis = function () {

  // Which visualization we currently are on
  var lastIndex = -1;
  var activeIndex = 0;

  var activateFunctions = []; //Functions called at the START of each section
  var updateFunctions = []; //Functions called DURING each section (takes a param progress 0.0 - 1.0)

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (data) {
      setupVis(data);
      setupSections();
    });
  };

  // Creates initial elements for all visualizations
  var setupVis = function (data) {
    // Add map
    // map = L.map('map', {
    //   zoomControl: false,
    //   scrollWheelZoom: false,
    //   doubleClickZoom: false,
    //   dragging: false
    // });
    //
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    // 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    // 	subdomains: 'abcd',
    // }).addTo(map);

    histogramData = data.histogramData;

    // Add histogram
    var svg = d3.select("#graph")
      .style("opacity", "0")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Add X Axis
    var x = d3.scaleLinear()
        .domain([0, 50])
        .range([0, width]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat((x) => x + "%").ticks(5));

    svg.append("text")
      .attr("class", "y-axis-label")
      .attr("transform",
            `translate(${width / 2},${height + 40})`)
      .style("text-anchor", "middle")
      .style("font-family", "IBMPlexSans")
      .style("font-size", 16);

    // set the parameters for the histogram
    histogram = d3.histogram()
      .value(function(d) { return d; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(25)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data.histogramData[0]);

    // Add median
    svg.append("text")
      .attr("class", "median-text")
      .style("text-anchor", "middle")
      .style("font-family", "IBMPlexSans")
      .style("font-size", 14);

    svg.append("polygon")
      .attr("class", "median-arrow")
      .style("fill", "#24252a");

    svg.append("line")
      .attr("class", "median-line")
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#24252a")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "4");

    // Add Y Axis
    svg.append("g")
      .attr("class", "y axis");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-family", "IBMPlexSans")
      .style("font-size", 16)
      .text("Number of Census Tracts");

    // Append histogram rectangles
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .style("fill", "#4e54c8");
  };

  // Handles display logic for sections
  var setupSections = function () {
    activateFunctions[0] = function(){displayImage("img1")};
    updateFunctions[0] = function(){};

    activateFunctions[1] = function(){displayImage("img1")};
    updateFunctions[1] = function(){};

    activateFunctions[2] = function(){displayImage("img2")};
    updateFunctions[2] = function(){};

    activateFunctions[3] = function(){displayImage("img2")};
    updateFunctions[3] = function(){};

    activateFunctions[4] = function(){
      displayImage("img3");
      d3.select("#graph").transition().duration(500).style("opacity", "0");
      currentHistogram = -1;
    };
    updateFunctions[4] = function(){};

    activateFunctions[5] = function(){
      d3.select("#img3").transition().duration(500).style("opacity", "0");
      displayHistogram(0, false);
    };
    updateFunctions[5] = function(){};

    activateFunctions[6] = function(){displayHistogram(0)};
    updateFunctions[6] = function(){};

    activateFunctions[7] = function(){displayHistogram(1)};
    updateFunctions[7] = function(){};

    activateFunctions[8] = function(){displayHistogram(2)};
    updateFunctions[8] = function(){};
  };

  function displayImage(id){
    d3.select("#vis").selectAll("img").transition().duration(500).style("opacity", "0");
    d3.select("#" + id).transition().duration(500).style("opacity", "1");
  }

  function displayHistogram(index, useMedian){
    currentHistogram = index;

    d3.select("#graph").transition().duration(500).style("opacity", "1");

    var x = d3.scaleLinear()
        .domain([0, 50])
        .range([0, width]);

    var bins = histogram(histogramData[index]),
        median = d3.median(histogramData[index]),
        medianX = x(median);

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(bins, function(d) { return d.length; })]);

    d3.select('.y.axis')
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    d3.select(".y-axis-label")
      .transition()
      .duration(1000)
      .text("Tree Canopy (" + ["Low", "Middle", "Upper"][index] + " Income Tracts)");

    // Update median
    if(useMedian == false){
      d3.select("svg").select(".median-text")
        .transition()
        .duration(1000)
        .style("opacity", "0");

      d3.select("svg").select(".median-line")
        .transition()
        .duration(1000)
        .style("opacity", "0");

      d3.select("svg").select(".median-arrow")
        .transition()
        .duration(1000)
        .style("opacity", "0");
    }
    else{
      d3.select("svg").select(".median-text")
        .transition()
        .duration(1000)
        .style("opacity", "1")
        .attr("transform", `translate(${medianX}, ${-22})`)
        .text(`Median (${d3.format(".2%")(median / 100)})`);

      d3.select("svg").select(".median-line")
        .transition()
        .duration(1000)
        .style("opacity", "1")
        .attr("x1", medianX)
        .attr("x2", medianX);

      d3.select("svg").select(".median-arrow")
        .transition()
        .duration(1000)
        .style("opacity", "1")
        .attr("points", `${medianX},-5 ${medianX - 10},-15 ${medianX + 10},-15`);
    }

    // Update bars
    d3.select("svg").selectAll("rect")
      .data(bins)
      .transition()
      .duration(1000)
      .attr("x", 1)
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", function(d) { return x(d.x1) - x(d.x0); })
      .attr("height", function(d) { return height - y(d.length);});
  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};

// Load data, then display
d3.json("/data/la-shade/census-tracts-2012.geojson")
  .then(function(data){ // Process data
    let histogramData = [[], [], []]; // Store the tree canopy cover, broken down by the median income of census tracts (lower, middle, upper income)

    data.features.forEach(function(d){
      let treePercent = parseFloat(d.properties["TREE-PCT"]),
          medianIncome = parseInt(d.properties["median-income"]);

      if(!isNaN(treePercent) && !isNaN(medianIncome)){
        if(medianIncome <= 42000) histogramData[0].push(treePercent); //Lower income
        else if(medianIncome <= 125000) histogramData[1].push(treePercent); //Middle income
        else histogramData[2].push(treePercent); //Upper income
      }
    });

    return {
      "geojson": data,
      "histogramData": histogramData
    };
  })
  .then(function(data) {
    var plot = scrollVis();

    d3.select('#vis')
      .datum(data)
      .call(plot);

    var scroll = scroller()
      .container(d3.select('#scrolling-vis'));

    scroll(d3.selectAll('.step'));

    scroll.on('active', function (index) {
      d3.selectAll('.step')
        .classed("active", function (d, i) { return i === index })
        .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

      plot.activate(index);
    });

    scroll.on('progress', function (index, progress) {
      plot.update(index, progress);
    });

    let resizeTimer;

    // Handle Resize
    d3.select(window)
      .on('resize', function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          width = document.getElementById("vis").offsetWidth - margin.left - margin.right - 20;

          var svg = d3.select("#graph").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

          var x = d3.scaleLinear()
            .domain([0, 50])
            .range([0, width]);

          svg.select(".x.axis")
            .call(d3.axisBottom(x).tickFormat((x) => x + "%").ticks(5));

          svg.select(".y-axis-label")
            .attr("transform",
                  `translate(${width / 2},${height + 40})`);

          histogram = d3.histogram()
            .value(function(d) { return d; })
            .domain(x.domain())
            .thresholds(x.ticks(25));

          if(currentHistogram != -1){
            var bins = histogram(histogramData[currentHistogram]),
                median = d3.median(histogramData[currentHistogram]),
                medianX = x(median);

            var y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(bins, function(d) { return d.length; })]);

            d3.select("svg").select(".median-text")
              .attr("transform", `translate(${medianX}, ${-22})`);

            d3.select("svg").select(".median-line")
              .attr("x1", medianX)
              .attr("x2", medianX);

            d3.select("svg").select(".median-arrow")
              .attr("points", `${medianX},-5 ${medianX - 10},-15 ${medianX + 10},-15`);

            d3.select("svg").selectAll("rect")
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
              .attr("width", function(d) { return x(d.x1) - x(d.x0); });
          }
        }, 50);
      });

  }).catch(function(err) {
      // handle error here
      console.log(err);
  });
