/*
  Parent class for all D3 charts.

  Props:
    * margin (required): object with integer fields top, left, right, bottom
    * padding (required): object with integer fields top, left, right, bottom
    * parseXCol (required): method that takes xcol and converts it into a different form
    * height (required): integer height of the visualization
    * xScale (required): method which takes integer params width, height and returns the scale for the x axis
    * yScale (required): method which takes integer params width, height and returns the scale for the y axis
    * xAxisFormat (optional): method which takes body_width, axis and formats the x axis
    * yAxisFormat (optional): method which takes body_width, axis and formats the y axis
    * setXDomain (optional): method which takes data, dataset and sets the domain of the x axis
    * setYDomain (optional): method which takes data, dataset and sets the domain of the y axis
    * renderData (required): method which takes i, ycol, x, y, svg, state and specifies how to draw the graph, given each ycol.
    * useTooltipLine (optional): boolean, display a vertical line with the tooltip
    * positionTooltip (required): method which takes mouse, tooltip, x, y, state and outputs an object with integer fields x, y telling how the tooltip should be positioned
    * formatTooltip (required): method which the data point and formats how the tooltip should be displayed
*/export default class Chart extends React.Component{constructor(a){// Load data from csv
super(a),this.state={data:[],chart:null,width:0,margin:a.margin,padding:a.padding,height:(a.height||300)-a.margin.top-a.margin.bottom,offset:0,body_width:0,dataset:a},d3.csv(a.csv).then(b=>{this.setState({data:b.map(function(b){return b[a.xcol]=a.parseXCol(b[a.xcol]),a.ycols.split(",").forEach(function(a){b[a]=parseFloat(b[a])}),b})})})}updateDimensions(){//Calculate new width
let a="false"==this.props.useoffset?0:(d3.select("body").node().offsetWidth-d3.select("#body").node().offsetWidth)/2,b=d3.select("body").node().offsetWidth,c=d3.select("#body").node().offsetWidth-this.state.margin.left-this.state.margin.right-this.state.padding.left-this.state.padding.right+2*a;this.setState({width:c,offset:a,body_width:b})}componentDidMount(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this));// Add D3 selector to state
let a=d3.select(this.props.chart);this.setState({chart:a})}renderGraph(){let a=this.state.margin,b=this.state.padding,c=this.state.dataset,d=this.state.chart,e=this.state.data,f=this.state.width,g=this.state.height,h=this.state.offset,i=this.state.body_width;// Set the ranges
var j=this.props.xScale(f,g).range([0,f]),k=this.props.yScale(f,g).range([g,0]),l=d3.axisBottom(j),m=d3.axisLeft(k);// Define axes
d.selectAll("*").remove();// Create canvas
var n=d.append("svg").attr("width",f+a.left+a.right).attr("height",g+a.top+a.bottom).style("transform","translate(-"+h+"px,0px)").append("g").attr("transform","translate("+a.left+","+a.top+")");// Add tooltip and tooltip line
d.append("div").attr("class","tooltip hidden");// Fit Domain
var o=d3.max(e,function(a){return Math.max(...c.ycols.split(",").map(function(b){return a[b]}))}),p=d3.extent(e,function(a){return a[c.xcol]});this.props.setXDomain?j.domain(this.props.setXDomain(e,c)):j.domain(p),this.props.setYDomain?k.domain(this.props.setYDomain(e,c)):k.domain([0,o]),this.props.xAxisFormat&&this.props.xAxisFormat(i,l),this.props.yAxisFormat&&this.props.yAxisFormat(i,m);// Render data
let q=this.state;c.ycols.split(",").forEach((a,b)=>{this.props.renderData(b,a,j,k,n,q)}),n.append("g").attr("class","x axis").attr("transform","translate(0,"+g+")").call(l),n.append("g").attr("class","y axis").call(m),d.insert("p",":first-child").html(c.title).attr("class","axis-label title"),d.append("p").attr("class","axis-label").style("text-align","center").html(c.xlabel),n.append("text").attr("transform","rotate(-90)").attr("class","axis-label").attr("y",0-a.left).attr("x",0-g/2).attr("dy","1em").text(c.ylabel),1<c.ycols.split(",").length&&d.append("div").attr("class","legend").selectAll(".legend-label").data(c.linelabels.split(",").map(function(a,b){return{color:c.linecolors.split(",")[b],label:a}})).enter().append("div").attr("class","legend-label").html(function(a){return"<div class = 'bubble' style = 'background-color:"+a.color+"'></div><span>"+a.label+"</span>"});/*
      TOOLTIP
    */var r=c.ycols.split(","),s=c.linecolors.split(","),t=c.linelabels.split(","),u=this.props.useTooltipLine,v=this.props.positionTooltip,w=this.props.formatTooltip;u&&n.append("line").attr("class","tooltip-line hidden").attr("x1",j(p[0])).attr("y1",k(0)).attr("x2",j(p[0])).attr("y2",k(o)).style("stroke","black").style("stroke-width","1").style("stroke-dasharray","5,5");var x,y=d.select(".tooltip");u&&(x=d.select(".tooltip-line"));var z=d3.bisector(function(a){return a[c.xcol]}).right;null==this.props.disableTooltip&&d.select("svg").on("mousemove",function(){var b=d3.mouse(this),d=j.invert(b[0]-a.left),f=z(e,d),g=e[f];null==g?(y.classed("hidden",!0),x.classed("hidden",!0)):(u&&x.attr("x1",j(g[c.xcol])).attr("x2",j(g[c.xcol])).classed("hidden",!1),y.classed("hidden",!1).html("<strong>"+w(g[c.xcol])+"</strong><br>"+r.map(function(a,b){return"<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:"+s[b]+"'></div>"+t[b]+": "+g[a].toFixed(2)+"</div>"}).join("")).style("left",v(b,y,j,k,q).left+"px").style("top",v(b,y,j,k,q).top+"px"))}).on("mouseout",function(){y.classed("hidden",!0),u&&x.classed("hidden",!0)})}render(){return this.state.data.length&&this.state.chart&&this.renderGraph(),null}}