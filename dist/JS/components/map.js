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
var a=this,b=d3.select(this.firstChild);d3.svg("/data/police-militarization/us-map-w-territories.svg").then(function(b){var c=b.documentElement;d3.select(a).node().appendChild(c)})});