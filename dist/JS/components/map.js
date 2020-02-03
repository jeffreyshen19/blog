d3.selectAll(".map").each(function(){var a,b=d3.select(this).select(".tooltip");d3.csv(this.dataset.csv).then(c=>{// Process csv data into correct format
let e=Object.keys(c[0]).slice(2),f=c.map(function(a){return e.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Get color scale
var g=d3.extent(f,a=>a["total-cost"]),h=d3.scaleLinear().domain(g).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);// Display SVG
d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then(c=>{var d=c.documentElement;d3.select(this).node().appendChild(d),d3.select(d).style("width","100%").style("height","100%").attr("viewBox","0 0 900 600").select("#g4864").selectAll("*").data(f,function(a){return a?a.state:this.className.baseVal.toUpperCase()})// Join svg elements to their corresponding state data
.style("transition","0.1s").style("fill",function(a){return h(a["total-cost"])}).on("mouseover",function(c){// Change color on hover
// Add tooltip text
console.log(c),d3.select(this).style("fill",d3.rgb(d3.color(h(c["total-cost"])).brighter(.3))),a=`
                <h1>${c["state-name"]}</h1>
                <
              `,b.classed("hidden",!1).html(a)}).on("mousemove",()=>{var a=d3.mouse(this.children[1]);b.style("left",a[0]-Math.round(b.node().offsetWidth/2)+"px").style("top",a[1]-Math.round(b.node().offsetHeight)-10+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(h(a["total-cost"]))),b.classed("hidden",!0)})})})});