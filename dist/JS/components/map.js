class Map extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null,yvar:"total-quantity",normalize:"none"}}componentDidMount(){d3.csv(this.state.dataset.csv).then(a=>{// Process csv data into correct format
let b=Object.keys(a[0]).slice(2),c=a.map(function(a){return b.forEach(function(b){a[b]=parseFloat(a[b])}),a});// Plot graph
d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then(a=>{var b=a.documentElement;d3.select(this.state.chart).node().appendChild(b),this.setState({svg:b,data:c})})})}renderGraph(){var a,b=d3.select(this.state.chart).select(".tooltip"),c=this.state.svg,d=this.state.data;// Get radio options
let e=this.state.yvar,f=this.state.normalize,g=function(a){return"none"==f?a[e]:a[e]/a[f]};// Get color scale
var h=d3.extent(d,a=>g(a)),i=d3.scaleLinear().domain(h).interpolate(d3.interpolateHcl).range([d3.rgb("#e4f1fe"),d3.rgb("#3a539b"),d3.rgb("#24252a")]);// Display SVG
d3.select(c).style("width","100%").style("height","100%").attr("viewBox","0 0 900 600").select("#g4864").selectAll("*").data(d,function(a){return a?a.state:this.className.baseVal.toUpperCase()})// Join svg this.state.charts to their corresponding state data
.style("transition","0.1s").style("fill",function(a){return i(g(a))}).on("mouseover",function(f){d3.select(this).style("fill",d3.rgb(d3.color(i(g(f))).brighter(.3)));let c=["grenade-launchers","night-vision","assault-rifles","armored-vehicles","aircraft","body-armor"].map(function(a){return{category:a,val:f[("total-cost"==e?"cost":"quantity")+"-"+a]}}).sort(function(c,a){return a.val-c.val});// Add tooltip text
console.log(f["state-name"]),a=`
            <h1>${f["state-name"]}</h1>
            <table class = "table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Type of Item</h1>
                  <th>${"total-cost"==e?"Cost":"Quantity"}</h1>
                </tr>
              </thead>
              <tbody>
                ${c.map(function(a){return`
                    <tr>
                      <td>${a.category}</td>
                      <td>${a.val}</td>
                    </tr>
                  `}).join("")}
                <tr>
                  <td>Other</td>
                  <td>${f[("total-cost"==e?"cost":"quantity")+"-other"]}</td>
                </tr>
              </tbody>
            </table>
          `,b.classed("hidden",!1).html(a)}).on("mousemove",()=>{var a=d3.mouse(this.state.chart.children[1]);b.style("left",a[0]-Math.round(b.node().offsetWidth/2)+"px").style("top",a[1]-Math.round(b.node().offsetHeight)-10+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(i(g(a)))),b.classed("hidden",!0)})}onYVarChanged(a){this.setState({yvar:a.currentTarget.value})}onNormalizeChanged(a){this.setState({normalize:a.currentTarget.value})}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),React.createElement("div",null,React.createElement("div",{class:"tooltip hidden"}),React.createElement("div",{class:"labels level"},React.createElement("div",{class:"level-left"},React.createElement("div",{class:"level-item"},React.createElement("div",null,React.createElement("span",{class:"heading"},"Show:"),React.createElement("input",{type:"radio",name:"yvar",id:"total-quantity",value:"total-quantity",checked:"total-quantity"===this.state.yvar,onChange:this.onYVarChanged.bind(this)}),React.createElement("label",{for:"total-quantity"},"Quantity of Items\xA0\xA0"),React.createElement("input",{type:"radio",name:"yvar",id:"total-cost",value:"total-cost",checked:"total-cost"===this.state.yvar,onChange:this.onYVarChanged.bind(this)}),React.createElement("label",{for:"total-cost"},"Cost of Items"))),React.createElement("div",{class:"level-item"},React.createElement("div",null,React.createElement("span",{class:"heading"},"Normalize by:"),React.createElement("input",{type:"radio",name:"normalize",id:"none",value:"none",checked:"none"===this.state.normalize,onChange:this.onNormalizeChanged.bind(this)}),React.createElement("label",{for:"none"},"None\xA0\xA0"),React.createElement("input",{type:"radio",name:"normalize",id:"population",value:"population",checked:"population"===this.state.normalize,onChange:this.onNormalizeChanged.bind(this)}),React.createElement("label",{for:"population"},"Population\xA0\xA0"),React.createElement("input",{type:"radio",name:"normalize",id:"violent_crime_rate_per_100000_inhabitants",value:"violent_crime_rate_per_100000_inhabitants",checked:"violent_crime_rate_per_100000_inhabitants"===this.state.normalize,onChange:this.onNormalizeChanged.bind(this)}),React.createElement("label",{for:"violent_crime_rate_per_100000_inhabitants"},"Violent Crime Rate"))))))}}const e=React.createElement;// Render all line charts
let elements=document.getElementsByClassName("map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(Map,{...elements[a].dataset,chart:elements[a]}),elements[a]);