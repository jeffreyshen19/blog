import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){// Which visualization we currently are on
var a,b=-1,c=0,d=[],e=[],f=function(a){a.each(function(a){g(a),h()})},g=function(){a=L.map("map",{zoomControl:!1,scrollWheelZoom:!1,doubleClickZoom:!1,dragging:!1}),L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{attribution:"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",subdomains:"abcd"}).addTo(a)},h=function(){d[0]=function(){},e[0]=function(){}};// return chart function
return f.activate=function(a){c=a;var e=0>c-b?-1:1,f=d3.range(b+e,c+e,e);f.forEach(function(a){d[a]()}),b=c},f.update=function(a,b){e[a](b)},f};// Load data, then display
d3.json("/data/la-shade/census-tracts-2012.geojson").then(function(a){// Process data
let b=[[],[],[]];// Store the tree canopy cover, broken down by the median income of census tracts (lower, middle, upper income)
return a.features.forEach(function(a){let c=parseFloat(a.properties["TREE-PCT"]),d=parseInt(a.properties["median-income"]);isNaN(c)||isNaN(d)||(42e3>=d?b[0].push(c):125e3>=d?b[1].push(c)://Middle income
b[2].push(c))}),{geojson:a,histogramData:b}}).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(a){// handle error here
console.log(a)});