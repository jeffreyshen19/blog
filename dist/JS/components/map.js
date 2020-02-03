d3.selectAll(".map").each(function(){var a,b=d3.select(this).select(".tooltip");// Append form inputs
d3.select(this).append("div").attr("class","labels level").html(`
      <div class = "level-left">
        <div class = "level-item">
          <div>
            <span class = "heading">Show:</span>
            <input type="radio" name="yvar" value="total-quantity" checked>Quantity of Items&nbsp;&nbsp;
            <input type="radio" name="yvar" value="total-cost">Cost of Items
          </div>
        </div>
        <div class = "level-item">
          <div>
            <span class = "heading">Normalize by:</span>
            <input type="radio" name="normalize" value="none" checked>None&nbsp;&nbsp;
            <input type="radio" name="normalize" value="population">Population&nbsp;&nbsp;
            <input type="radio" name="normalize" value="violent_crime_rate_per_100000_inhabitants">Violent Crime Rate
          </div>
        </div>
      </div>
    `),d3.csv(this.dataset.csv).then(c=>{// Process csv data into correct format
let e=Object.keys(c[0]).slice(2),f=c.map(function(a){return e.forEach(function(b){a[b]=parseFloat(a[b])}),a}),g=d3.select(this).select("input[name=\"yvar\"]:checked").node().value,h=d3.select(this).select("input[name=\"normalize\"]:checked").node().value,i=function(a){return"none"==h?a[g]:a[g]/a[h]};// Get color scale
var j=d3.extent(f,a=>i(a)),k=d3.scaleLinear().domain(j).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);// Display SVG
d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then(c=>{var d=c.documentElement;d3.select(this).node().appendChild(d),d3.select(d).style("width","100%").style("height","100%").attr("viewBox","0 0 900 600").select("#g4864").selectAll("*").data(f,function(a){return a?a.state:this.className.baseVal.toUpperCase()})// Join svg elements to their corresponding state data
.style("transition","0.1s").style("fill",function(a){return k(i(a))}).on("mouseover",function(c){// Change color on hover
// Add tooltip text
d3.select(this).style("fill",d3.rgb(d3.color(k(i(c))).brighter(.3))),a=`
                <h1>${c["state-name"]}</h1>
                <
              `,b.classed("hidden",!1).html(a)}).on("mousemove",()=>{var a=d3.mouse(this.children[1]);b.style("left",a[0]-Math.round(b.node().offsetWidth/2)+"px").style("top",a[1]-Math.round(b.node().offsetHeight)-10+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(k(i(a)))),b.classed("hidden",!0)})})})});