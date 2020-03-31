import scroller from "/dist/JS/scrollytelling/scroller.js";

var scrollVis = function () {
  const margin = {top: 50, right: 30, bottom: 70, left: 55},
      width = document.getElementById("vis").offsetWidth - margin.left - margin.right,
      height = document.getElementById("vis").offsetHeight - margin.top - margin.bottom;

  // Which visualization we currently are on
  var lastIndex = -1;
  var activeIndex = 0;

  var activateFunctions = []; //Functions called at the START of each section
  var updateFunctions = []; //Functions called DURING each section (takes a param progress 0.0 - 1.0)

  var map, histogram, histogramData;

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
      .call(d3.axisBottom(x).tickFormat((x) => x + "%"));

    svg.append("text")
      .attr("transform",
            `translate(${width / 2},${height + 40})`)
      .style("text-anchor", "middle")
      .style("font-family", "IBMPlexSans")
      .style("font-size", 16)
      .text("Percent of Census Tract Area Covered By Tree Canopy");

    // set the parameters for the histogram
    histogram = d3.histogram()
      .value(function(d) { return d; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(25)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data.histogramData[0]),
        median = d3.median(data.histogramData[0]);


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
    activateFunctions[0] = function(){displayHistogram(0)};
    updateFunctions[0] = function(){};

    activateFunctions[1] = function(){displayHistogram(1)};
    updateFunctions[1] = function(){};

    activateFunctions[2] = function(){displayHistogram(2)};
    updateFunctions[2] = function(){};
  };

  function displayHistogram(index){
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
      .call(d3.axisLeft(y));
      // TODO: animate y axis transition

    // Update median
    d3.select("svg").select(".median-text")
      .attr("transform", `translate(${medianX}, ${-22})`)
      .text(`Median (${d3.format(".2%")(median / 100)})`);

    d3.select("svg").select(".median-line")
      .attr("x1", medianX)
      .attr("x2", medianX);

    d3.select("svg").select(".median-arrow")
      .attr("points", `${medianX},-5 ${medianX - 10},-15 ${medianX + 10},-15`);

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
  }).catch(function(err) {
      // handle error here
      console.log(err);
  });
