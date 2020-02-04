class Map extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){// Append form inputs
d3.select(this.state.chart).append("div").attr("class","labels level").html(`
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
      `),d3.select(this.state.chart).append("div").attr("class","tooltip hidden"),d3.csv(this.state.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(2),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Plot graph
d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then(a=>{var b=a.documentElement;d3.select(this.state.chart).node().appendChild(b),this.setState({svg:b,data:c})})})}renderGraph(){var a,b=d3.select(this.state.chart).select(".tooltip"),c=this.state.svg,d=this.state.data;// Get radio options
let e=d3.select(this.state.chart).select("input[name=\"yvar\"]:checked").node().value,f=d3.select(this.state.chart).select("input[name=\"normalize\"]:checked").node().value,g=function(a){return"none"==f?a[e]:a[e]/a[f]};// Get color scale
var h=d3.extent(d,a=>g(a)),i=d3.scaleLinear().domain(h).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);// Display SVG
d3.select(c).style("width","100%").style("height","100%").attr("viewBox","0 0 900 600").select("#g4864").selectAll("*").data(d,function(a){return a?a.state:this.className.baseVal.toUpperCase()})// Join svg this.state.charts to their corresponding state data
.style("transition","0.1s").style("fill",function(a){return i(g(a))}).on("mouseover",function(c){// Change color on hover
// Add tooltip text
d3.select(this).style("fill",d3.rgb(d3.color(i(g(c))).brighter(.3))),a=`
            <h1>${c["state-name"]}</h1>
            <
          `,b.classed("hidden",!1).html(a)}).on("mousemove",()=>{var a=d3.mouse(this.state.chart.children[1]);b.style("left",a[0]-Math.round(b.node().offsetWidth/2)+"px").style("top",a[1]-Math.round(b.node().offsetHeight)-10+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(i(g(a)))),b.classed("hidden",!0)})}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),null}}const e=React.createElement;// Render all line charts
let elements=document.getElementsByClassName("map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(Map,{...elements[a].dataset,chart:elements[a]}),elements[a]);