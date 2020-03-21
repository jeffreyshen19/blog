import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){function a(a){a.setStyle({fillColor:"none",opacity:0})}function b(a,b){a.setStyle({fillColor:b,opacity:1})}function c(a){n[a].forEach(function(a){a.setOpacity(0),a.closeTooltip()})}function d(a){n[a].forEach(function(a){a.setOpacity(1),a.openTooltip()})}function e(a,c,d){a.eachLayer(function(a){if(c(a))return!1!=d&&g.fitBounds(a.getBounds(),{duration:.5}),void b(a,"blue")})}function f(b,c,d){b.eachLayer(function(b){c(b)&&(!1!=d&&g.fitBounds(b.getBounds(),{duration:.5}),a(b))})}// return chart function
// Which visualization we currently are on
var g,h=-1,i=0,j=[],k=[],l=[];let m,n=[[[[34.0218948,-118.498265],"Santa Monica"],[[34.0825832,-118.4170435],"Beverly Hills"],[[33.8932864,-118.2393202],"Compton"]],[[[34.0115278,-118.1798982],"East Los Angeles"]],[[[33.8340569,-117.8805115],"Disneyland!"],[[34.137662,-118.1274577],"Caltech"]],[[[34.0432117,-118.2587082],"Downtown L.A."]]];/**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */var o=function(a){a.each(function(a){p(a[0],a[1],a[2],a[3],a[4]),q()})},p=function(b,c,d,e,f){m=f,console.log(f),g=L.map("map",{zoomControl:!1,scrollWheelZoom:!1,doubleClickZoom:!1,dragging:!1}),L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{attribution:"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",subdomains:"abcd"}).addTo(g),l[0]=L.geoJSON(b),l[1]=L.geoJSON(c),l[2]=L.geoJSON(d),l[3]=L.geoJSON(e);for(let h=0;h<l.length;h++)a(l[h]),l[h].addTo(g);//Add markers
n=n.map(function(a){return a.map(function(a){return a=L.marker(a[0],{opacity:0}).bindTooltip(a[1],{direction:"top",className:"label"}).addTo(g),a.closeTooltip(),a})})},q=function(){j[0]=function(){a(l[0]),g.setView([33.9490603,-118.0994376],10)},k[0]=function(){},j[1]=function(){e(l[0],function(a){return"Los Angeles"==a.feature.properties.NAME}),c(0)},k[1]=function(){},j[2]=function(){d(0),c(1),e(l[0],function(a){return"Los Angeles"==a.feature.properties.NAME})},k[2]=function(){},j[3]=function(){d(1),c(2),e(l[0],function(a){return"Los Angeles"==a.feature.properties.NAME}),f(l[1],function(a){return"51445"===a.feature.properties.GEOID10},!1)},k[3]=function(){},j[4]=function(){c(1),c(3),d(0),d(2),f(l[0],function(a){return"Los Angeles"==a.feature.properties.NAME},!1),e(l[1],function(a){return"51445"===a.feature.properties.GEOID10})},k[4]=function(){},j[5]=function(){c(0),c(2),d(3),e(l[1],function(a){return"51445"===a.feature.properties.GEOID10})},k[5]=function(){},j[6]=function(){e(l[1],function(a){return"51445"===a.feature.properties.GEOID10}),f(l[2],function(a){return"31080"===a.feature.properties.GEOID},!1)},k[6]=function(){},j[7]=function(){f(l[1],function(a){return"51445"===a.feature.properties.GEOID10},!1),e(l[2],function(a){return"31080"===a.feature.properties.GEOID})},k[7]=function(){},j[8]=function(){e(l[2],function(a){return"31080"===a.feature.properties.GEOID}),f(l[3],function(a){return"348"===a.feature.properties.GEOID},!1)},k[8]=function(){},j[9]=function(){f(l[2],function(a){return"31080"===a.feature.properties.GEOID},!1),e(l[3],function(a){return"348"===a.feature.properties.GEOID})},k[9]=function(){},j[10]=function(){},k[10]=function(){},j[11]=function(){},k[11]=function(){}};// Creates initial elements for all visualizations
return o.activate=function(a){i=a;var b=0>i-h?-1:1,c=d3.range(h+b,i+b,b);c.forEach(function(a){j[a]()}),h=i},o.update=function(a,b){k[a](b)},o};// Load data, then display
Promise.all([d3.json("/data/metropolitan-areas/cities.geojson"),d3.json("/data/metropolitan-areas/urban-areas.geojson"),d3.json("/data/metropolitan-areas/msa.geojson"),d3.json("/data/metropolitan-areas/csa.geojson"),d3.json("/data/metropolitan-areas/city-metadata.json")]).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(){// handle error here
});