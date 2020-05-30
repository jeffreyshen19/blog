import scroller from "/dist/JS/scrollytelling/scroller.js";

const margin = {top: 50, right: 15, bottom: 70, left: 55};
let width = document.getElementById("vis").offsetWidth - margin.left - margin.right - 20,
    height = document.getElementById("vis").offsetHeight - margin.top - margin.bottom;

let svg, counties, radiusScale, categories = ["Chinese (Unspecified)","Mandarin","Cantonese","Hakka","Wu","Kan, Hsiang","Fuchow","Formosan","Total"];

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
    d3.select('#map').style("text-align", "center").node().append(data[0].documentElement);
    svg = d3.select("svg");

    // Style paths
    svg.select("#State_Lines").style("stroke", "white");

    // Organize data to match it by county
    let countyDataDict = {}, countyData = [], maxValue = 0;
    data[1].forEach(function(d){
      countyDataDict[d["County"]] = d;
    })

    function getCentroid(e){
      var bbox = e.getBBox();
      return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
    }

    svg.select("#stylegroup").selectAll("path")
      .style("stroke", "white")
      .each(function(d) {
        let name = d3.select(this).select("title").text();
        if(name in countyDataDict) {
          countyDataDict[name].center = getCentroid(this);
          countyDataDict[name].fullName = (countyDataDict[name].County == "Baltimore County, MD" || countyDataDict[name].County == "Baltimore, MD" ? countyDataDict[name].County : countyDataDict[name].County.split(",")[0] + " County," + countyDataDict[name].County.split(",")[1]);

          countyData.push(countyDataDict[name]);
          maxValue = Math.max(maxValue, countyDataDict[name]["Total"])
        }
      });

    // Radius scale
    radiusScale = d3.scaleSqrt().domain([0, maxValue]).range([0, 20]);

    // Add Circles
    counties = svg.select("#stylegroup")
      .selectAll("circle")
      .data(countyData)
      .enter()
      .append("circle")
        .style("fill", "rgba(102, 51, 153, 0.15)")
        .style("stroke", "rgba(102, 51, 153, 0.5)")
        .style("stroke-width", 1)
        .style("transition", "0.2s all")
        .attr("cx", (d) => {
          return d.center[0]
        })
        .attr("cy", (d) => {
          return d.center[1]
        });
  };

  // Handles display logic for sections
  var setupSections = function () {
    activateFunctions[0] = function(){
      counties.attr("r", function(d){
        return radiusScale(d["Total"])
      })
    };
    updateFunctions[0] = function(){};

    activateFunctions[1] = function(){
      counties.attr("r", function(d){
        return radiusScale(d["Mandarin"])
      })
    };
    updateFunctions[1] = function(){};

    activateFunctions[2] = function(){
      counties.attr("r", function(d){
        return radiusScale(d["Cantonese"])
      })
    };
    updateFunctions[2] = function(){};

    activateFunctions[3] = function(){
      counties.attr("r", function(d){
        return d["Cantonese"] - d["Mandarin"] > 0 ? radiusScale(d["Cantonese"] - d["Mandarin"]) : 0;
      })
    };
    updateFunctions[3] = function(){};

    activateFunctions[4] = function(){
      counties.attr("r", function(d){
        return d["Mandarin"] - d["Cantonese"] > 0 ? radiusScale(d["Mandarin"] - d["Cantonese"]) : 0;
      })
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
