import scroller from "/dist/JS/scrollytelling/scroller.js";

var scrollVis = function () {
  const width = 600,
        height = 520,
        margin = { top: 0, left: 20, bottom: 40, right: 10 };

  let svg = null,
      g = null; // d3 selection that will be used for displaying visualizations

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
    selection.each(function (rawData) {
      svg = d3.select(this).append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom);

      g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      setupVis();
      setupSections();
    });
  };


  // Creates initial elements for all visualizations
  var setupVis = function (data) {
    var map = L.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false
    }).setView([33.9490603, -118.0994376], 10);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    }).addTo(map);
  };

  // Handles display logic for sections
  var setupSections = function () {
    activateFunctions[0] = function(){};
    updateFunctions[0] = function() {};

  };

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
Promise.all([
  d3.json("/data/metropolitan-areas/cities.geojson"),
  d3.json("/data/metropolitan-areas/urban-areas.geojson"),
  d3.json("/data/metropolitan-areas/msa.geojson"),
  d3.json("/data/metropolitan-areas/csa.geojson"),
]).then(function(data) {
  console.log(data);
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#scrolling-vis'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}).catch(function(err) {
    // handle error here
})
