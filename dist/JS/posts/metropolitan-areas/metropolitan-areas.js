/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 * SOURCE: https://github.com/vlandham/scroll_demo
 */import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){/**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */ /**
   * showTitle - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */function a(){x.selectAll(".count-title").transition().duration(0).attr("opacity",0),x.selectAll(".openvis-title").transition().duration(600).attr("opacity",1)}/**
   * showFillerTitle - filler counts
   *
   * hides: intro title
   * hides: square grid
   * shows: filler count title
   *
   */function b(){x.selectAll(".openvis-title").transition().duration(0).attr("opacity",0),x.selectAll(".square").transition().duration(0).attr("opacity",0),x.selectAll(".count-title").transition().duration(600).attr("opacity",1)}/**
   * showGrid - square grid
   *
   * hides: filler count title
   * hides: filler highlight in grid
   * shows: square grid
   *
   */function c(){x.selectAll(".count-title").transition().duration(0).attr("opacity",0),x.selectAll(".square").transition().duration(600).delay(function(a){return 5*a.row}).attr("opacity",1).attr("fill","#ddd")}/**
   * highlightGrid - show fillers in grid
   *
   * hides: barchart, text and axis
   * shows: square grid and highlighted
   *  filler words. also ensures squares
   *  are moved back to their place in the grid
   */function d(){l(),x.selectAll(".bar").transition().duration(600).attr("width",0),x.selectAll(".bar-text").transition().duration(0).attr("opacity",0),x.selectAll(".square").transition().duration(0).attr("opacity",1).attr("fill","#ddd"),x.selectAll(".fill-square").transition("move-fills").duration(800).attr("x",function(a){return a.x}).attr("y",function(a){return a.y}),x.selectAll(".fill-square").transition().duration(800).attr("opacity",1).attr("fill",function(a){return a.filler?"#008080":"#ddd"})}/**
   * showBar - barchart
   *
   * hides: square grid
   * hides: histogram
   * shows: barchart
   *
   */function e(){k(D),x.selectAll(".square").transition().duration(800).attr("opacity",0),x.selectAll(".fill-square").transition().duration(800).attr("x",0).attr("y",function(a,b){return y(b%3)+y.bandwidth()/2}).transition().duration(0).attr("opacity",0),x.selectAll(".hist").transition().duration(600).attr("height",function(){return 0}).attr("y",function(){return 520}).style("opacity",0),x.selectAll(".bar").transition().delay(function(a,b){return 300*(b+1)}).duration(600).attr("width",function(a){return i(a.value)}),x.selectAll(".bar-text").transition().duration(600).delay(1200).attr("opacity",1)}/**
   * showHistPart - shows the first part
   *  of the histogram of filler words
   *
   * hides: barchart
   * hides: last half of histogram
   * shows: first half of histogram
   *
   */function f(){k(E),x.selectAll(".bar-text").transition().duration(0).attr("opacity",0),x.selectAll(".bar").transition().duration(600).attr("width",0),x.selectAll(".hist").transition().duration(600).attr("y",function(a){return 15>a.x0?B(a.length):520}).attr("height",function(a){return 15>a.x0?520-B(a.length):0}).style("opacity",function(a){return 15>a.x0?1:1e-6})}/**
   * showHistAll - show all histogram
   *
   * hides: cough title and color
   * (previous step is also part of the
   *  histogram, so we don't have to hide
   *  that)
   * shows: all histogram bars
   *
   */function h(){k(E),x.selectAll(".cough").transition().duration(0).attr("opacity",0),x.selectAll(".hist").transition("color").duration(500).style("fill","#008080"),x.selectAll(".hist").transition().duration(1200).attr("y",function(a){return B(a.length)}).attr("height",function(a){return 520-B(a.length)}).style("opacity",1)}/**
   * showCough
   *
   * hides: nothing
   * (previous and next sections are histograms
   *  so we don't have to hide much here)
   * shows: histogram
   *
   */function j(){k(E),x.selectAll(".hist").transition().duration(600).attr("y",function(a){return B(a.length)}).attr("height",function(a){return 520-B(a.length)}).style("opacity",1)}/**
   * showAxis - helper function to
   * display particular xAxis
   *
   * @param axis - the axis to show
   *  (xAxisHist or xAxisBar)
   */function k(a){x.select(".x.axis").call(a).transition().duration(500).style("opacity",1)}/**
   * hideAxis - helper function
   * to hide the axis
   *
   */function l(){x.select(".x.axis").transition().duration(500).style("opacity",0)}/**
   * UPDATE FUNCTIONS
   *
   * These will be called within a section
   * as the user scrolls through it.
   *
   * We use an immediate transition to
   * update visual elements based on
   * how far the user has scrolled
   *
   */ /**
   * updateCough - increase/decrease
   * cough text and color
   *
   * @param progress - 0.0 - 1.0 -
   *  how far user has scrolled in section
   */function m(a){x.selectAll(".cough").transition().duration(0).attr("opacity",a),x.selectAll(".hist").transition("cough").duration(0).style("fill",function(b){return 14<=b.x0?C(a):"#008080"})}/**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */ /**
   * getWords - maps raw data to
   * array of data objects. There is
   * one data object for each word in the speach
   * data.
   *
   * This function converts some attributes into
   * numbers and adds attributes used in the visualization
   *
   * @param rawData - data read in from file
   */function n(a){return console.log(a),a.map(function(a,b){return a.filler="1"===a.filler,a.time=+a.time,a.min=Math.floor(a.time/60),a.col=b%75,a.x=8*a.col,a.row=Math.floor(b/75),a.y=8*a.row,a})}/**
   * getFillerWords - returns array of
   * only filler words
   *
   * @param data - word data from getWords
   */function o(a){return a.filter(function(a){return a.filler})}/**
   * getHistogram - use d3's histogram layout
   * to generate histogram bins for our word data
   *
   * @param data - word data. we use filler words
   *  from getFillerWords
   */function p(a){// only get words from the first 30 minutes
var b=a.filter(function(a){return 30>a.min});// bin data into 2 minutes chuncks
// from 0 - 31 minutes
// @v4 The d3.histogram() produces a significantly different
// data structure then the old d3.layout.histogram().
// Take a look at this block:
// https://bl.ocks.org/mbostock/3048450
// to inform how you use it. Its different!
return d3.histogram().thresholds(A.ticks(10)).value(function(a){return a.min})(b)}/**
   * groupByWord - group words together
   * using nest. Used to get counts for
   * barcharts.
   *
   * @param words
   */function q(a){return d3.nest().key(function(a){return a.word}).rollup(function(a){return a.length}).entries(a).sort(function(c,a){return a.value-c.value})}/**
   * activate -
   *
   * @param index - index of the activated section
   */ // constants to define the size
// and margins of the vis area.
var r=520,s={top:0,left:20,bottom:40,right:10},t=-1,u=0,v=6,w=null,x=null,i=d3.scaleLinear().range([0,600]),y=d3.scaleBand().paddingInner(.08).domain([0,1,2]).range([0,r-50],.1,.1),z={0:"#008080",1:"#399785",2:"#5AAF8C"},A=d3.scaleLinear().domain([0,30]).range([0,580]),B=d3.scaleLinear().range([r,0]),C=d3.scaleLinear().domain([0,1]).range(["#008080","red"]),D=d3.axisBottom().scale(i),E=d3.axisBottom().scale(A).tickFormat(function(a){return a+" min"}),F=[],G=[],H=function(a){a.each(function(a){w=d3.select(this).selectAll("svg").data([void 0]);var b=w.enter().append("svg");// @v4 use merge to combine enter and existing selection
w=w.merge(b),w.attr("width",600+s.left+s.right),w.attr("height",r+s.top+s.bottom),w.append("g"),x=w.select("g").attr("transform","translate("+s.left+","+s.top+")");// perform some preprocessing on raw data
var c=n(a),d=o(c),e=q(d),f=d3.max(e,function(a){return a.value});// filter to just include filler words
i.domain([0,f]);// get aggregated histogram data
var g=p(d),h=d3.max(g,function(a){return a.length});// set histogram's domain
B.domain([0,h]),I(c,e,g),J()})},I=function(a,b,c){x.append("g").attr("class","x axis").attr("transform","translate(0,"+r+")").call(D),x.select(".x.axis").style("opacity",0),x.append("text").attr("class","title openvis-title").attr("x",300).attr("y",r/3).text("2013"),x.append("text").attr("class","sub-title openvis-title").attr("x",300).attr("y",r/3+r/5).text("OpenVis Conf"),x.selectAll(".openvis-title").attr("opacity",0),x.append("text").attr("class","title count-title highlight").attr("x",300).attr("y",r/3).text("180"),x.append("text").attr("class","sub-title count-title").attr("x",300).attr("y",r/3+r/5).text("Filler Words"),x.selectAll(".count-title").attr("opacity",0);// square grid
// @v4 Using .merge here to ensure
// new and old data have same attrs applied
var d=x.selectAll(".square").data(a,function(a){return a.word}),e=d.enter().append("rect").classed("square",!0);d=d.merge(e).attr("width",v).attr("height",v).attr("fill","#fff").classed("fill-square",function(a){return a.filler}).attr("x",function(a){return a.x}).attr("y",function(a){return a.y}).attr("opacity",0);// barchart
// @v4 Using .merge here to ensure
// new and old data have same attrs applied
var f=x.selectAll(".bar").data(b),g=f.enter().append("rect").attr("class","bar");f=f.merge(g).attr("x",0).attr("y",function(a,b){return y(b)}).attr("fill",function(a,b){return z[b]}).attr("width",0).attr("height",y.bandwidth());var h=x.selectAll(".bar-text").data(b);h.enter().append("text").attr("class","bar-text").text(function(a){return a.key+"\u2026"}).attr("x",0).attr("dx",15).attr("y",function(a,b){return y(b)}).attr("dy",y.bandwidth()/1.2).style("font-size","110px").attr("fill","white").attr("opacity",0);// histogram
// @v4 Using .merge here to ensure
// new and old data have same attrs applied
var i=x.selectAll(".hist").data(c),j=i.enter().append("rect").attr("class","hist");i=i.merge(j).attr("x",function(a){return A(a.x0)}).attr("y",r).attr("height",0).attr("width",A(c[0].x1)-A(c[0].x0)-1).attr("fill",z[0]).attr("opacity",0),x.append("text").attr("class","sub-title cough cough-title").attr("x",300).attr("y",60).text("cough").attr("opacity",0),w.append("defs").append("marker").attr("id","arrowhead").attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z"),x.append("path").attr("class","cough cough-arrow").attr("marker-end","url(#arrowhead)").attr("d",function(){var a="M 290 80";return a+=" l 0 230",a}).attr("opacity",0)},J=function(){F[0]=a,F[1]=b,F[2]=c,F[3]=d,F[4]=e,F[5]=f,F[6]=h,F[7]=j,F[8]=h;// updateFunctions are called while
// in a particular section to update
// the scroll progress in that section.
// Most sections do not need to be updated
// for all scrolling and so are set to
// no-op functions.
for(var g=0;9>g;g++)G[g]=function(){};G[7]=m};// return chart function
return H.activate=function(a){u=a;var b=0>u-t?-1:1,c=d3.range(t+b,u+b,b);c.forEach(function(a){F[a]()}),t=u},H.update=function(a,b){G[a](b)},H};/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */function display(a){console.log(a);// create a new plot and
// display it
var b=scrollVis();d3.select("#vis").datum(a).call(b);// setup scroll functionality
var c=scroller().container(d3.select("#scrolling-vis"));// pass in .step selection as the steps
// setup event handling
c(d3.selectAll(".step")),c.on("active",function(a){// highlight current step text
// activate current section
d3.selectAll(".step").style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}// load data and display
d3.tsv("https://raw.githubusercontent.com/vlandham/scroll_demo/gh-pages/data/words.tsv").then(display);