import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){const a={top:0,left:20,bottom:40,right:10};let b=null,c=null;// d3 selection that will be used for displaying visualizations
// Which visualization we currently are on
var d=-1,e=0,f=[],h=[],i=function(d){d.each(function(){b=d3.select(this).append("svg").attr("width",600+a.left+a.right).attr("height",520+a.top+a.bottom),c=b.append("g").attr("transform","translate("+a.left+","+a.top+")"),j(),k()})},j=function(){var a=L.map("map",{zoomControl:!1,scrollWheelZoom:!1,doubleClickZoom:!1,dragging:!1}).setView([33.9490603,-118.0994376],10);L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{attribution:"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",subdomains:"abcd"}).addTo(a)},k=function(){f[0]=function(){},h[0]=function(){}};// return chart function
return i.activate=function(a){e=a;var b=0>e-d?-1:1,c=d3.range(d+b,e+b,b);c.forEach(function(a){f[a]()}),d=e},i.update=function(a,b){h[a](b)},i};// Load data, then display
Promise.all([d3.json("/data/metropolitan-areas/cities.geojson"),d3.json("/data/metropolitan-areas/urban-areas.geojson"),d3.json("/data/metropolitan-areas/msa.geojson"),d3.json("/data/metropolitan-areas/csa.geojson")]).then(function(a){console.log(a);var b=scrollVis();d3.select("#vis").datum(a).call(b);// setup scroll functionality
var c=scroller().container(d3.select("#scrolling-vis"));// pass in .step selection as the steps
// setup event handling
c(d3.selectAll(".step")),c.on("active",function(a){// highlight current step text
// activate current section
d3.selectAll(".step").style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(){// handle error here
});