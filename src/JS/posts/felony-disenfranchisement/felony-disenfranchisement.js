import scroller from "/dist/JS/scrollytelling/scroller.js";

const margin = {top: 50, right: 15, bottom: 70, left: 55};
let width = document.getElementById("vis").offsetWidth - margin.left - margin.right - 20,
    height = document.getElementById("vis").offsetHeight - margin.top - margin.bottom;

let map, histogram, histogramData, currentHistogram = -1;

const NUM_DISENFRANCHISED = 6106327;

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
    d3.select("#vis").style("height", NUM_DISENFRANCHISED / width + "px");
    d3.select("#dot").style("background-color", "black").style("margin", "0 auto").style("transition", "0.5s");
    d3.select(".step:nth-of-type(3)").style("padding-bottom", NUM_DISENFRANCHISED / width + "px");
  };

  // Handles display logic for sections
  var setupSections = function () {
    // Show one dot
    activateFunctions[0] = function(){
      d3.select("#dot").style("width", "10px").style("height", "10px").style("margin-top", "200px");
    };
    updateFunctions[0] = function(){};

    activateFunctions[1] = activateFunctions[0];
    updateFunctions[1] = function(){};

    activateFunctions[2] = function(){
      d3.select("#dot").style("width", width + "px").style("height", NUM_DISENFRANCHISED / width + "px").style("margin-top", 0);
    };
    updateFunctions[2] = function(){};

    activateFunctions[3] = function(){
      console.log("switching");
    };
    updateFunctions[3] = function(){};
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

// Start visualization
var plot = scrollVis();

d3.select('#vis')
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

    }, 50);
  });
