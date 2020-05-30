import scroller from "/dist/JS/scrollytelling/scroller.js";

const margin = {top: 50, right: 15, bottom: 70, left: 55};
let width = document.getElementById("vis").offsetWidth - margin.left - margin.right - 20,
    height = document.getElementById("vis").offsetHeight - margin.top - margin.bottom;

let svg, counties;

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
    // Add svg
    d3.select('#map').node().append(data[0].documentElement);
    svg = d3.select("svg");

    // Join data

    // -- First, get proper order of data
    let countyDataDict = {}, countyData = [];
    data[1].forEach(function(d){
      countyDataDict[d["County"]] = d;
    })

    svg.select("#stylegroup").selectAll("path")
      .each(function(d) {
        let name = d3.select(this).select("title").text();
        if(name in countyDataDict) countyData.push(countyDataDict[name])
        else countyData.push(null)
      });

    // -- Then, bind data to DOM
    counties = svg.select("#stylegroup").selectAll("path")
      .data(countyData)
  };

  // Handles display logic for sections
  var setupSections = function () {
    activateFunctions[0] = function(){};
    updateFunctions[0] = function(){};
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
  d3.xml('/data/chinese-dialects/usa_counties.svg'),
  d3.csv('/data/chinese-dialects/languages.csv')
])
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
      }, 50);
    });

}).catch(function(err) {
  // handle error here
  console.log(err);
});
