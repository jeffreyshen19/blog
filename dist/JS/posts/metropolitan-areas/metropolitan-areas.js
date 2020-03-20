import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){function a(a){a.setStyle({fillColor:"none",opacity:0})}function b(a,b){a.setStyle({fillColor:b,opacity:1})}// return chart function
// Which visualization we currently are on
var c,d=-1,e=0,f=[],g=[],h=[],i=function(a){a.each(function(a){j(a[0],a[1],a[2],a[3]),k()})},j=function(b,d,e,f){c=L.map("map",{zoomControl:!1,scrollWheelZoom:!1,doubleClickZoom:!1,dragging:!1}),L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{attribution:"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",subdomains:"abcd"}).addTo(c),h[0]=L.geoJSON(b),h[1]=L.geoJSON(d),h[2]=L.geoJSON(e),h[3]=L.geoJSON(f);for(let g=0;g<h.length;g++)a(h[g]),h[g].addTo(c)},k=function(){f[0]=function(){a(h[0]),c.setView([33.9490603,-118.0994376],10)},g[0]=function(){},f[1]=function(){h[0].eachLayer(function(a){"Los Angeles"==a.feature.properties.NAME&&(c.flyToBounds(a.getBounds(),{duration:.5}),b(a,"blue"))})},g[1]=function(){}};return i.activate=function(a){e=a;var b=0>e-d?-1:1,c=d3.range(d+b,e+b,b);c.forEach(function(a){f[a]()}),d=e},i.update=function(a,b){g[a](b)},i};// Load data, then display
Promise.all([d3.json("/data/metropolitan-areas/cities.geojson"),d3.json("/data/metropolitan-areas/urban-areas.geojson"),d3.json("/data/metropolitan-areas/msa.geojson"),d3.json("/data/metropolitan-areas/csa.geojson")]).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(){// handle error here
});