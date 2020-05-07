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

  var addTickLabel = function(text, people){
    d3.select("#dot").append("text")
      .text(text)
      .attr("x", (people % 1000000 == 0 ? 100 : (people % 500000 == 0 ? 75 : 50)) + 10)
      .attr("y", people / width + 6)
      .style("fill", "white");
  }

  // Creates initial elements for all visualizations
  var setupVis = function (data) {
    d3.select("#vis").style("height", NUM_DISENFRANCHISED / width + "px");
    d3.select("#dot").style("left", "50%").style("transform", "translateX(-50%)").style("position", "relative").style("transition", "0.5s").style("background-color", "#24252a").style("font-size", "14px");
    d3.select(".step:nth-of-type(3)").style("padding-bottom", NUM_DISENFRANCHISED / width / 2 + "px");
    d3.select(".step:nth-of-type(4)").style("padding-bottom", NUM_DISENFRANCHISED / width / 2 + "px");

    // Add ticks to svg
    for(var i = 100000; i < NUM_DISENFRANCHISED; i += 100000){
      d3.select("#dot").append("line")
        .attr("stroke", "white")
        .attr("x1", 0)
        .attr("x2", (i % 1000000 == 0 ? 100 : (i % 500000 == 0 ? 75 : 50)))
        .attr("y1", i / width)
        .attr("y2", i / width);

      if(i % 1000000 == 0) addTickLabel(i / 1000000 + "M", i);
    }

    // Add scale
    addTickLabel("100k people", 100000)
  };

  // Handles display logic for sections
  var setupSections = function () {
    let dot = d3.select("#dot");

    // Show one dot
    activateFunctions[0] = function(){
      dot.attr("width", 10).attr("height", 10).style("margin-top", "200px");
    };
    updateFunctions[0] = function(){};

    activateFunctions[1] = activateFunctions[0];
    updateFunctions[1] = function(){};

    activateFunctions[2] = function(){
      // Set height
      dot.attr("width", width).attr("height", NUM_DISENFRANCHISED / width).style("margin-top", 0);

    };
    updateFunctions[2] = function(){};

    activateFunctions[3] = function(){
      console.log("switching");
    };
    updateFunctions[3] = function(){};

    activateFunctions[4] = function(){
      console.log("switching 2");
    };
    updateFunctions[4] = function(){};
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
