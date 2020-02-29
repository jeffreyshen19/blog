class CaliforniaMap extends React.Component{constructor(a){super(a),this.state={data:[],chart:this.props.chart,dataset:this.props,svg:null}}componentDidMount(){var a=L.map("california-map").setView([38.0409129,-120.5467139],6);L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",{attribution:"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."}).addTo(a),L.svg().addTo(a),console.log("yoo"),d3.json("/data/california-migration/california-counties.geojson").then(function(b){function c(){g.attr("d",f)}var d=d3.select("#california-map").select("svg"),e=d3.geoTransform({point:function(b,c){var d=a.latLngToLayerPoint(new L.LatLng(c,b));this.stream.point(d.x,d.y)}}),f=d3.geoPath().projection(e),g=d.selectAll("path").data(b.features).enter().append("path").attr("stroke","gray").attr("fill","green").attr("fill-opacity",.6);a.on("moveend",c),c()})}getTooltipText(e){function a(a){return parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}// // Sort county level data into the order they should be displayed
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
    `}renderGraph(){// var tooltipText,
//     tooltip = d3.select(this.state.chart).select(".tooltip"),
//     svg = this.state.svg,
//     data = this.state.data,
//     getTooltipText = this.getTooltipText;
//
// let getYVal = function(d){
//   return d["net-exodus"]
// };
//
// // Get color scale
// var extent = d3.extent(data, (d) => getYVal(d));
// var colors = d3.scaleDiverging().domain([extent[0], 0, extent[1]])
//   .interpolator(d3.piecewise(d3.interpolateRgb, ["#3a539b", "#ecf0f1", "#c0392b"]));
//
// // Display SVG
// d3.select(svg)
//   .style("width", "100%")
//   .style("margin", "0 auto")
//   .attr("viewBox", "0 0 600 750")
//   .select("#polygons").selectAll("*")
//     .data(data, function(d) { return d ? d.code : this.id; }) // Join data to corresponding county
//     .style("transition", "0.1s")
//     .style("cursor", "pointer")
//     .style("fill", function(d, i){
//       return colors(getYVal(d));
//     })
//     .on("mouseover", function(d, i){
//       // Change color on hover
//       d3.select(this).style("fill", d3.rgb(colors(getYVal(d) * 0.6)));
//       tooltip.html(getTooltipText(d));
//     })
//     .on("mousemove", (d) => {
//       var mouse = d3.mouse(this.state.chart);
//
//       tooltip.classed("hidden", false).style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
//         .style("top", mouse[1] + 20 + "px");
//     })
//     .on("mouseout", function(d){
//       d3.select(this).style("fill", d3.rgb(colors(getYVal(d))));
//       tooltip.classed("hidden", true);
//     });
}render(){return this.state.data.length&&this.state.svg&&this.renderGraph(),null}}const e=React.createElement;// Render all charts
let elements=document.getElementsByClassName("california-map");for(let a=0;a<elements.length;a++)ReactDOM.render(e(CaliforniaMap,{...elements[a].dataset,chart:elements[a]}),elements[a]);