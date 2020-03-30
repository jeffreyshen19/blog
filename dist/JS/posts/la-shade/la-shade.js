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
const b={top:50,right:30,bottom:70,left:55},c=document.getElementById("vis").offsetWidth-b.left-b.right,e=document.getElementById("vis").offsetHeight-b.top-b.bottom;var f=d3.select("#graph").append("svg").attr("width",c+b.left+b.right).attr("height",e+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")"),g=d3.scaleLinear().domain([0,50]).range([0,c]);// Add X Axis
f.append("g").attr("transform","translate(0,"+e+")").call(d3.axisBottom(g).tickFormat(a=>a+"%")),f.append("text").attr("transform",`translate(${c/2},${e+40})`).style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",16).text("Percent of Census Tract Area Covered By Tree Canopy");// set the parameters for the histogram
var d=d3.histogram().value(function(a){return a})// I need to give the vector of value
.domain(g.domain())// then the domain of the graphic
.thresholds(g.ticks(25)),h=d(a.histogramData[0]),i=d3.median(a.histogramData[0]),j=g(i);// then the numbers of bins
// And apply this function to data to get the bins
f.append("text").attr("transform",`translate(${j}, ${-22})`).style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",14).text(`Median (${d3.format(".2%")(i/100)})`),f.append("polygon").attr("points",`${j},-5 ${j-10},-15 ${j+10},-15`).style("fill","black"),f.append("line").attr("x1",j).attr("x2",j).attr("y1",0).attr("y2",e).style("stroke","black").style("stroke-width",1).style("stroke-dasharray","4");// Add Y Axis
var k=d3.scaleLinear().range([e,0]);k.domain([0,d3.max(h,function(a){return a.length})]),f.append("g").call(d3.axisLeft(k)),f.append("text").attr("transform","rotate(-90)").attr("y",0-b.left).attr("x",0-e/2).attr("dy","1em").style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",16).text("Number of Census Tracts"),f.selectAll("rect").data(h).enter().append("rect").attr("x",1).attr("transform",function(a){return"translate("+g(a.x0)+","+k(a.length)+")"}).attr("width",function(a){return g(a.x1)-g(a.x0)}).attr("height",function(a){return e-k(a.length)}).style("fill","#4e54c8")},g=function(){c[0]=function(){},d[0]=function(){}};// return chart function
return e.activate=function(d){b=d;var e=0>b-a?-1:1,f=d3.range(a+e,b+e,e);f.forEach(function(a){c[a]()}),a=b},e.update=function(a,b){d[a](b)},e};// Load data, then display
d3.json("/data/la-shade/census-tracts-2012.geojson").then(function(a){// Process data
let b=[[],[],[]];// Store the tree canopy cover, broken down by the median income of census tracts (lower, middle, upper income)
return a.features.forEach(function(a){let c=parseFloat(a.properties["TREE-PCT"]),d=parseInt(a.properties["median-income"]);isNaN(c)||isNaN(d)||(42e3>=d?b[0].push(c):125e3>=d?b[1].push(c)://Middle income
b[2].push(c))}),{geojson:a,histogramData:b}}).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(a){// handle error here
console.log(a)});