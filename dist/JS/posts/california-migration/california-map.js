class CaliforniaMap extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){function a(a,c){var d=b.latLngToLayerPoint(new L.LatLng(c,a));this.stream.point(d.x,d.y)}var b=L.map("california-map").setView([38.0409129,-120.5467139],6);L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",{attribution:"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."}).addTo(b),L.svg().addTo(b);var c=d3.select(this.state.chart).select(".leaflet-tooltip-pane").node(),e=this.getTooltipText,f=d3.select(this.state.chart).select(".leaflet-tooltip-pane").append("div").attr("class","tooltip");d3.csv("/data/california-migration/county-net-exodus.csv").then(d=>{// Process csv data into correct format
let g=Object.keys(d[0]).slice(2),h={};// Plot graph
d.forEach(function(a){g.forEach(function(b){a[b]=parseFloat(a[b])}),a.county=a.county.replace(" County",""),h[a.county]=a}),d3.json("/data/california-migration/california-counties.geojson").then(function(d){function g(){n.attr("d",k)}var i=d3.select("#california-map").select("svg"),j=d3.geoTransform({point:a}),k=d3.geoPath().projection(j),d=d.features.map(function(a){return a.data=h[a.properties.name],a}),l=d3.extent(d,a=>a.data["net-exodus"]),m=d3.scaleDiverging().domain([l[0],0,l[1]]).interpolator(d3.piecewise(d3.interpolateRgb,["#3a539b","#ecf0f1","#c0392b"])),n=i.selectAll("path").data(d).enter().append("path").style("transition","0.1s").style("cursor","pointer").style("pointer-events","visible").attr("stroke","white").attr("fill",function(a){return m(a.data["net-exodus"])}).on("mouseover",function(a){// Change color on hover
d3.select(this).style("fill",d3.rgb(m(.6*a.data["net-exodus"]))),f.html(e(a.data))}).on("mousemove",()=>{var a=d3.mouse(c);f.classed("hidden",!1).style("left",a[0]-Math.round(f.node().offsetWidth/2)+"px").style("top",a[1]+20+"px")}).on("mouseout",function(a){d3.select(this).style("fill",d3.rgb(m(a.data["net-exodus"]))),f.classed("hidden",!0)});// Merge data
b.on("moveend",g),g()})})}getTooltipText(e){function a(a){return parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}// // Sort county level data into the order they should be displayed
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