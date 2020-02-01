d3.selectAll(".map").each(function(){// var total = 0,
//     regionNames = ["Discontinuous", "Northeast", "Southeast", "Southwest", "West", "Midwest", "International"];
//
// var accent = d3.color(this.dataset.accent);
//
// var colors = ["#abdde3","#74cee0","#42b6da","#1e8cb9","#13659d","#0c3d8b","#182552"];
//
// var responses = this.dataset.responses.split(",").map(function(element, i){
//   total += parseInt(element);
//   return {
//     responses: parseInt(element),
//     name: regionNames[i]
//   };
// });
//
// var colorSort = responses.slice().sort(function(a, b) {
//   return a.responses - b.responses;
// });
//
// responses = responses.map(function(element, i){
//   return {
//     responses: element.responses,
//     name: element.name,
//     color: colors[colorSort.indexOf(element)]
//   };
// });
d3.select(this.firstChild);d3.csv(this.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(1),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Display SVG
d3.svg("/data/police-militarization/us-map-w-territories.svg").then(a=>{console.log(a.documentElement);var b=a.documentElement;d3.select(this).node().appendChild(b),d3.select(b).select(".state").selectAll("*").data(c,function(a){return a?a.state:this.id})// .data(data)
// .data(data, function(d){ //Match svg ids with data ids
//   console.log(d);
//   return this.id || d.state;
// })
.style("fill",function(){// if(d.state == "AK") return "#ff0000";
// else return "#00000"
return"#00ff00"}).on("mouseover",function(a){console.log(a)})})})});