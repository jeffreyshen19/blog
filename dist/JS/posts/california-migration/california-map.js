class CaliforniaMap extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){d3.csv(this.state.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(2),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Plot graph
d3.svg("/data/california-migration/california-counties.svg").then(a=>{var b=a.documentElement;//Append map
// Append tooltip
d3.select(this.state.chart).append("div").attr("class","svg").style("text-align","center").style("position","relative").node().appendChild(b),d3.select(this.state.chart).select(".svg").append("div").attr("class","tooltip hidden"),this.setState({svg:b,data:c})})})}getTooltipText(e){function a(a){return parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}// // Sort county level data into the order they should be displayed
let b=Object.keys(e).slice(3),c=b.map(function(a){return{county:a.replace("flow-to-","").replace(/-/g," "),flow:e[a]}}).filter(function(a){return!isNaN(a.flow)&&Math.sign(a.flow)==Math.sign(e["net-exodus"])}).sort(function(c,a){return(0>e["net-exodus"]?-1:1)*(a.flow-c.flow);// If net flow is negative, sort ascending, otherwise descending
});// Add tooltip text
return c=c.slice(0,Math.min(5,c.length)),`
      <h1>${e.county}</h1>
      <p>${a(Math.abs(e["net-exodus"]))} people ${0>e["net-exodus"]?"moved here from":"left here for"} other counties in CA</p>
      <table>
        <thead>
          <tr>
            <th>County ${0>e["net-exodus"]?"They Moved From":"They Left For"}</h1>
            <th>Number of People</h1>
          </tr>
        </thead>
        <tbody>
          ${c.map(function(b){return`
              <tr>
                <td>${b.county}</td>
                <td>${a(Math.abs(b.flow))}</td>
              </tr>
            `}).join("")}
      </table>
    `}renderGraph(){var a=d3.select(this.state.chart).select(".tooltip"),b=this.state.svg,c=this.state.data,e=this.getTooltipText;let f=function(a){return a["net-exodus"]};// Get color scale
var g=d3.extent(c,a=>f(a)),h=d3.scaleDiverging().domain([g[0],0,g[1]]).interpolator(d3.piecewise(d3.interpolateRgb,["#3a539b","#ecf0f1","#c0392b"]));// Display SVG
d3.select(b).style("height","550px").style("margin","0 auto").attr("viewBox","0 0 600 750").select("#polygons").selectAll("*").data(c,function(a){return a?a.code:this.id})// Join data to corresponding county
.style("transition","0.1s").style("cursor","pointer").style("fill",function(a){return h(f(a))}).on("mouseover",function(b){// Change color on hover
d3.select(this).style("fill",d3.rgb(d3.color(h(f(b))).brighter(.2))),a.html(e(b))}).on("mousemove",()=>{var b=d3.mouse(this.state.chart);a.classed("hidden",!1).style("left",b[0]-Math.round(a.node().offsetWidth/2)+"px").style("top",b[1]+20+"px")}).on("mouseout",function(b){d3.select(this).style("fill",d3.rgb(h(f(b)))),a.classed("hidden",!0)})}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),null}}const e=React.createElement;// Render all charts
let elements=document.getElementsByClassName("california-map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(CaliforniaMap,{...elements[a].dataset,chart:elements[a]}),elements[a]);