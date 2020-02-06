import NormalizeHeader from"/dist/JS/components/subcomponents/normalize.js";class Map extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null,yvar:"total-quantity",normalize:"none"},this.onYVarChanged=this.onYVarChanged.bind(this),this.onNormalizeChanged=this.onNormalizeChanged.bind(this)}componentDidMount(){d3.csv(this.state.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(2),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Plot graph
d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then(a=>{var b=a.documentElement;//Append map
// Append tooltip
d3.select(this.state.chart).append("div").attr("class","svg").node().appendChild(b),d3.select(this.state.chart).select(".svg").append("div").attr("class","tooltip hidden"),this.setState({svg:b,data:c})})})}getTooltipText(a,b){function d(a){return("total-cost"==b?"$":"")+parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}// Mapping from column names to display names
let e={"grenade-launchers":"Grenades & Launchers","night-vision":"Night Vision","assault-rifles":"Assault Rifles","armored-vehicles":"Armored Vehicles",aircraft:"Aircraft","body-armor":"Body Armor & Shields"},f=["grenade-launchers","night-vision","assault-rifles","armored-vehicles","aircraft","body-armor"].map(function(d){return{category:e[d],val:a[("total-cost"==b?"cost":"quantity")+"-"+d]}}).sort(function(c,a){return a.val-c.val});// Sort categories into the order they should be displayed
// Add tooltip text
return`
      <h1>${a["state-name"]}</h1>
      <table>
        <thead>
          <tr>
            <th>Type of Item</h1>
            <th>${"total-cost"==b?"Cost":"Quantity"}</h1>
          </tr>
        </thead>
        <tbody>
          ${f.map(function(a){return`
              <tr>
                <td>${a.category}</td>
                <td>${d(a.val)}</td>
              </tr>
            `}).join("")}
          <tr>
            <td>Other</td>
            <td>${d(a[("total-cost"==b?"cost":"quantity")+"-other"])}</td>
          </tr>
          <tr>
            <td><i>Total</i></td>
            <td><i>${d(a["total-"+("total-cost"==b?"cost":"quantity")])}</i></td>
          </tr>
        </tbody>
      </table>
    `}renderGraph(){var a=d3.select(this.state.chart).select(".tooltip"),b=this.state.svg,c=this.state.data;// Get radio options
let e=this.state.yvar,f=this.state.normalize,g=function(a){return"none"==f?a[e]:a[e]/a[f]};// Get color scale
var h=d3.extent(c,a=>g(a)),i=d3.scaleLinear().domain(h).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);let j=this.getTooltipText;// Display SVG
d3.select(b).style("width","100%").style("height","100%").attr("viewBox","0 0 900 600").select("#g4864").selectAll("*").data(c,function(a){return a?a.state:this.className.baseVal.toUpperCase()})// Join svg this.state.charts to their corresponding state data
.style("transition","0.1s").style("fill",function(a){return i(g(a))}).on("mouseover",function(b){// Change color on hover
d3.select(this).style("fill",d3.rgb(d3.color(i(g(b))).brighter(.2))),a.html(j(b,e))}).on("mousemove",()=>{var b=d3.mouse(this.state.chart.children[1]);a.classed("hidden",!1).style("left",b[0]-Math.round(a.node().offsetWidth/2)+"px").style("top",b[1]+20+"px")}).on("mouseout",function(b){d3.select(this).style("fill",d3.rgb(i(g(b)))),a.classed("hidden",!0)})}onYVarChanged(a){this.setState({yvar:a.currentTarget.value})}onNormalizeChanged(a){this.setState({normalize:a.currentTarget.value})}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),React.createElement(NormalizeHeader,{yvar:this.state.yvar,normalize:this.state.normalize,yVarHandler:this.onYVarChanged,normalizeHandler:this.onNormalizeChanged,id:"1"})}}const e=React.createElement;// Render all line charts
let elements=document.getElementsByClassName("map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(Map,{...elements[a].dataset,chart:elements[a]}),elements[a]);