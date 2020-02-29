class CaliforniaMap extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){function a(a,b){var c=e.latLngToLayerPoint(new L.LatLng(b,a));this.stream.point(c.x,c.y)}var b=L.latLng(23.158612,-132.638983),c=L.latLng(45.326572,-108.24783),d=L.latLngBounds(b,c),e=L.map("california-map",{minZoom:5,maxZoom:9,maxBounds:d,maxBoundsViscosity:.5}).setView([37.0409129,-120.5467139],6);L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",{attribution:"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."}).addTo(e),L.svg().addTo(e);var f=d3.select(this.state.chart).select(".leaflet-tooltip-pane").node(),g=this.getTooltipText,h=d3.select(this.state.chart).select(".leaflet-tooltip-pane").append("div").attr("class","tooltip hidden");d3.csv("/data/california-migration/county-net-exodus.csv").then(b=>{// Process csv data into correct format
let c=Object.keys(b[0]).slice(2),i={};// Plot graph
b.forEach(function(a){c.forEach(function(b){a[b]=parseFloat(a[b])}),a.county=a.county.replace(" County",""),i[a.county]=a}),d3.json("/data/california-migration/california-counties.geojson").then(function(b){function c(){o.attr("d",k)}var d=d3.select("#california-map").select("svg"),j=d3.geoTransform({point:a}),k=d3.geoPath().projection(j),b=b.features.map(function(a){return a.data=i[a.properties.name],a}),l=d3.extent(b,a=>a.data["net-exodus"]),m=d3.scaleDiverging().domain([l[0],0,l[1]]).interpolator(d3.piecewise(d3.interpolateRgb,["#3a539b","#ecf0f1","#c0392b"])),n=d3.select("#california-map").append("div").style("width","20px").style("height","150px").style("bottom","10px").style("left","10px").style("z-index","1000").style("position","absolute").style("background","linear-gradient(#c0392b, #ecf0f1, #3a539b)");// Merge data
n.append("p").html("More<br>Left<br>Here").style("position","absolute").style("white-space","nowrap").style("line-height","1.1em").style("left","25px").style("top",0),n.append("p").html("More<br>Moved<br>Here").style("position","absolute").style("white-space","nowrap").style("line-height","1.1em").style("left","25px").style("margin-bottom",0).style("bottom",0);// Color map elements
var o=d.selectAll("path").data(b).enter().append("path").style("transition","0.1s").style("cursor","pointer").style("pointer-events","visible").attr("stroke","white").attr("fill",function(a){return m(a.data["net-exodus"])}).on("mouseover",function(a){// Change color on hover
d3.select(this).style("fill",d3.rgb(m(.6*a.data["net-exodus"]))),h.html(g(a.data))}).on("mousemove",()=>{var a=d3.mouse(f);h.classed("hidden",!1).style("left",a[0]-Math.round(h.node().offsetWidth/2)+"px").style("top",a[1]+20+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(m(a.data["net-exodus"]))),h.classed("hidden",!0)});e.on("moveend",c),c()})})}getTooltipText(e){function a(a){return parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}// // Sort county level data into the order they should be displayed
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
    `}render(){return null}}const e=React.createElement;// Render all charts
let elements=document.getElementsByClassName("california-map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(CaliforniaMap,{...elements[a].dataset,chart:elements[a]}),elements[a]);