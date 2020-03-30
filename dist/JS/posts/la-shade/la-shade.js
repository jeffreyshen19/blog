import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){// Which visualization we currently are on
var a=-1,b=0,c=[],d=[],e=function(a){a.each(function(a){f(a),g()})},f=function(a){// Add map
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
// Add histogram
const b={top:10,right:30,bottom:30,left:40},c=460-b.left-b.right,e=400-b.top-b.bottom;var f=d3.select("#graph").append("svg").attr("width",c+b.left+b.right).attr("height",e+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")"),g=d3.scaleLinear().domain([0,50]).range([0,c]);// X axis: scale and draw:
f.append("g").attr("transform","translate(0,"+e+")").call(d3.axisBottom(g));// set the parameters for the histogram
var d=d3.histogram().value(function(a){return a})// I need to give the vector of value
.domain(g.domain())// then the domain of the graphic
.thresholds(g.ticks(25)),h=d(a.histogramData[0]),i=d3.scaleLinear().range([e,0]);// then the numbers of bins
// And apply this function to data to get the bins
i.domain([0,d3.max(h,function(a){return a.length})]),f.append("g").call(d3.axisLeft(i)),f.selectAll("rect").data(h).enter().append("rect").attr("x",1).attr("transform",function(a){return"translate("+g(a.x0)+","+i(a.length)+")"}).attr("width",function(a){return g(a.x1)-g(a.x0)-1}).attr("height",function(a){return e-i(a.length)}).style("fill","#4e54c8")},g=function(){c[0]=function(){},d[0]=function(){}};// return chart function
return e.activate=function(d){b=d;var e=0>b-a?-1:1,f=d3.range(a+e,b+e,e);f.forEach(function(a){c[a]()}),a=b},e.update=function(a,b){d[a](b)},e};// Load data, then display
d3.json("/data/la-shade/census-tracts-2012.geojson").then(function(a){// Process data
let b=[[],[],[]];// Store the tree canopy cover, broken down by the median income of census tracts (lower, middle, upper income)
return a.features.forEach(function(a){let c=parseFloat(a.properties["TREE-PCT"]),d=parseInt(a.properties["median-income"]);isNaN(c)||isNaN(d)||(42e3>=d?b[0].push(c):125e3>=d?b[1].push(c)://Middle income
b[2].push(c))}),{geojson:a,histogramData:b}}).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(a){// handle error here
console.log(a)});