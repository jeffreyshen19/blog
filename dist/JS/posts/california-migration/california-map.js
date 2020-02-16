class CaliforniaMap extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){d3.csv(this.state.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(2),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Plot graph
d3.svg("/data/california-migration/california-counties.svg").then(a=>{var b=a.documentElement;//Append map
// Append tooltip
d3.select(this.state.chart).append("div").attr("class","svg").style("text-align","center").node().appendChild(b),d3.select(this.state.chart).select(".svg").append("div").attr("class","tooltip hidden"),this.setState({svg:b,data:c})})})}getTooltipText(a){return"yo"}renderGraph(){var a=d3.select(this.state.chart).select(".tooltip"),b=this.state.svg,c=this.state.data;// Get radio options
let e=function(a){return a["net-exodus"]};// Get color scale
var f=d3.extent(c,a=>e(a)),g=d3.scaleLinear().domain(f).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);this.getTooltipText;// Display SVG
d3.select(b).style("height","500px").style("margin","0 auto").attr("viewBox","0 0 700 700").select("#polygons").selectAll("*").data(c,function(a){return a?a.code:this.id})// Join data to corresponding county
// // .style("transition", "0.1s")
.style("fill",function(){return"red";// return colors(getYVal(d));
})}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),null}}const e=React.createElement;// Render all charts
let elements=document.getElementsByClassName("california-map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(CaliforniaMap,{...elements[a].dataset,chart:elements[a]}),elements[a]);