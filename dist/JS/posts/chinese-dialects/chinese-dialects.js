import scroller from"/dist/JS/scrollytelling/scroller.js";const margin={top:50,right:15,bottom:70,left:55};let svg,counties,width=document.getElementById("vis").offsetWidth-margin.left-margin.right-20,height=document.getElementById("vis").offsetHeight-margin.top-margin.bottom;var scrollVis=function(){// Which visualization we currently are on
var a=-1,b=0,c=[],d=[],e=function(a){a.each(function(a){f(a),g()})},f=function(a){function b(a){var b=a.getBBox();return[b.x+b.width/2,b.y+b.height/2]}d3.select("#map").node().append(a[0].documentElement),svg=d3.select("svg"),svg.select("#State_Lines").style("stroke","white");// Add circles for each county that has data
let c={},d=[];a[1].forEach(function(a){c[a.County]=a}),svg.select("#stylegroup").selectAll("path").style("stroke","white").each(function(){let a=d3.select(this).select("title").text();a in c&&(d.push(c[a]),svg.append("circle").style("fill","red").style("stroke","red").attr("r",5).attr("cx",()=>b(this)[0]).attr("cy",()=>b(this)[1]))}),counties=svg.select("#stylegroup").selectAll("circle").data(d)},g=function(){c[0]=function(){// counties.style("fill", function(d){
//   if(d == null) return "#d0d0d0";
//   console.log(path.centroid(d));
//   return "red";
// })
},d[0]=function(){}};// return chart function
return e.activate=function(d){b=d;var e=0>b-a?-1:1,f=d3.range(a+e,b+e,e);f.forEach(function(a){c[a]()}),a=b},e.update=function(a,b){d[a](b)},e};// Load data, then display
Promise.all([d3.xml("/data/chinese-dialects/usa_counties.svg"),d3.csv("/data/chinese-dialects/languages.csv")]).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)});let d;// Handle Resize
d3.select(window).on("resize",function(){clearTimeout(d),d=setTimeout(function(){},50)})}).catch(function(a){// handle error here
console.log(a)});