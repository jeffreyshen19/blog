export default class PieChart extends React.Component{constructor(c){// Load data from csv
super(c),this.state={data:[],chart:null,width:0,dataset:c},d3.csv(c.csv).then(a=>{//Process csv data into correct format
let b=a.map(function(a){return a[c.ycol]=parseFloat(a[c.ycol]),a}).sort(function(d,a){return d[c.ycol]-a[c.ycol]});this.setState({data:b})})}componentDidMount(){// Add D3 selector to state
let a=d3.select(this.props.chart);this.setState({chart:a})}formatTooltipData(a){return("Cost"==this.props.ycol?"$":"")+parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}renderGraph(){let a=this.props.ycol,b=this.props.xcol,c=this.state.data,d=this.state.chart,e=this.formatTooltipData.bind(this);//Assign colors to each slice
var f=d3.scaleLinear().domain([0,c.length-1]).interpolate(d3.interpolateHcl).range(this.props.colorrange.split(",").map(function(a){return d3.rgb(a)})),g=d.append("div").attr("class","tooltip hidden"),h=d3.pie().value(function(b){return b[a]}).sort(null),i=d3.arc().outerRadius(150).innerRadius(75);d.style("width",300);let j=d.node();d.append("svg").attr("width",300).attr("height",300).append("g").attr("transform","translate(150,150)").selectAll("path").data(h(c)).enter().append("path").attr("fill",function(a,b){return f(b)}).attr("stroke","white").style("transition","0.2s").attr("d",i).on("mouseover",function(c,d){g.classed("hidden",!1).html(`
                <h1>${c.data[b]}</h1>
                ${a}: ${e(c.data[a])}
              `),d3.select(this).style("fill",d3.rgb(d3.color(f(d)).brighter(.5)))}).on("mousemove",function(){let a=d3.mouse(j);g.style("left",a[0]+20+"px").style("top",a[1]+20+"px")}).on("mouseout",function(a,b){g.classed("hidden",!0),d3.select(this).style("fill",f(b))});//
// //Add labels underneath pie chart
// var pieLabel = d3.select(this).append("div")
//   .attr("class", "pie-label")
//   .style("width", width + "px");
//
// if(name) pieLabel.append("h3").html(name);
//
// pieLabel.selectAll("span").data(piedata)
//   .enter().append("span")
//     .html(function(d, i){
//       return "<div class = 'bubble' style = 'background:" + d.color + "'></div>" + d.label;
//     }).append("br");
}render(){return this.state.data.length&&this.state.chart&&this.renderGraph(),null}}const e=React.createElement;// Render all line charts
let elements=document.getElementsByClassName("pie-chart");for(let a=0;a<elements.length;a++)ReactDOM.render(e(PieChart,{...elements[a].dataset,chart:elements[a]}),elements[a]);