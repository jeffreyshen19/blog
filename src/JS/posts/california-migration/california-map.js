function makeMap() {
  var southWest = L.latLng(23.158612, -132.638983),
    northEast = L.latLng(45.326572, -108.247830);
  var bounds = L.latLngBounds(southWest, northEast);

  var map = L.map('california-map', {
    minZoom: 5,
    maxZoom: 9,
    maxBounds: bounds,
    maxBoundsViscosity: 0.5,
  }).setView([37.0409129, -120.5467139], 6);

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
  }).addTo(map);

  L.svg().addTo(map);

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  var mouseContainer = d3.select("#california-map").select(".leaflet-tooltip-pane").node(),
    tooltip = d3.select("#california-map").select(".leaflet-tooltip-pane").append("div").attr("class", "tooltip hidden");

  d3.csv("/data/california-migration/county-net-exodus.csv")
    .then((values) => {
      // Process csv data into correct format
      let ycolumns = Object.keys(values[0]).slice(2);
      let data = {};
      values.forEach(function(d) {
        ycolumns.forEach(function(ycol) {
          d[ycol] = parseFloat(d[ycol]);
        });
        d.county = d.county.replace(" County", "")
        data[d.county] = d;
      });

      // Plot graph
      d3.json("/data/california-migration/california-counties.geojson").then(function(features) {
        var svg = d3.select("#california-map").select("svg"),
          transform = d3.geoTransform({
            point: projectPoint
          }),
          path = d3.geoPath().projection(transform);

        // Merge data
        var features = features.features.map(function(d) {
          d.data = data[d.properties.name];
          return d;
        })

        // Get color scale
        var extent = d3.extent(features, (d) => d.data["net-exodus"]);
        var colors = d3.scaleDiverging().domain([extent[0], 0, extent[1]])
          .interpolator(d3.piecewise(d3.interpolateRgb, ["#3a539b", "#ecf0f1", "#c0392b"]));

        //Add legend
        var legend = d3.select("#california-map").append("div")
          .style("width", "20px")
          .style("height", "150px")
          .style("bottom", "10px")
          .style("left", "10px")
          .style("z-index", "1000")
          .style("position", "absolute")
          .style("background", "linear-gradient(#c0392b, #ecf0f1, #3a539b)");

        legend.append("p")
          .html("More<br>Left<br>Here")
          .style("position", "absolute")
          .style("white-space", "nowrap")
          .style("line-height", "1.1em")
          .style("left", "25px")
          .style("top", 0);

        legend.append("p")
          .html("More<br>Moved<br>Here")
          .style("position", "absolute")
          .style("white-space", "nowrap")
          .style("line-height", "1.1em")
          .style("left", "25px")
          .style("margin-bottom", 0)
          .style("bottom", 0);

        // Color map elements
        var featureElement = svg.selectAll("path")
          .data(features)
          .enter()
          .append("path")
          .style("transition", "0.1s")
          .style("cursor", "pointer")
          .style("pointer-events", "visible")
          .attr("stroke", "white")
          .attr("fill", function(d, i) {
            return colors(d.data["net-exodus"]);
          })
          .on("mouseover", function(d, i) {
            // Change color on hover
            d3.select(this).style("fill", d3.rgb(colors(d.data["net-exodus"] * 0.6)));
            tooltip.html(getTooltipText(d.data));
          })
          .on("mousemove", (d) => {
            var mouse = d3.mouse(mouseContainer);

            tooltip.classed("hidden", false).style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
              .style("top", mouse[1] + 20 + "px");
          })
          .on("mouseout", function(d) {
            d3.select(this).style("fill", d3.rgb(colors(d.data["net-exodus"])));
            tooltip.classed("hidden", true);
          });

        map.on("moveend", update);

        update();

        function update(e) {
          featureElement.attr("d", path);
        }

      });
    })
}

function getTooltipText(d) {
  function formatNum(num) {
    return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // // Sort county level data into the order they should be displayed
  let counties = Object.keys(d).slice(3);
  let county_data = counties.map(function(c) {
      return {
        "county": c.replace("flow-to-", "").replace(/-/g, " "),
        "flow": d[c]
      }
    })
    .filter(function(c) {
      return !isNaN(c.flow) && Math.sign(c.flow) == Math.sign(d["net-exodus"]);
    })
    .sort(function(a, b) {
      return (d["net-exodus"] < 0 ? -1 : 1) * (b.flow - a.flow); // If net flow is negative, sort ascending, otherwise descending
    });
  county_data = county_data.slice(0, Math.min(5, county_data.length));

  // Add tooltip text
  return `
      <h1>${d["county"]}</h1>
      <p>${formatNum(Math.abs(d["net-exodus"]))} people ${d["net-exodus"] < 0 ? "moved here from" : "left here for"} other counties in CA</p>
      <table>
        <thead>
          <tr>
            <th>County ${d["net-exodus"] < 0 ? "They Moved From" : "They Left For"}</h1>
            <th>Number of People</h1>
          </tr>
        </thead>
        <tbody>
          ${county_data.map(function(c){
            return `
              <tr>
                <td>${c.county}</td>
                <td>${formatNum(Math.abs(c.flow))}</td>
              </tr>
            `
          }).join("")}
      </table>
    `;
}

document.addEventListener("DOMContentLoaded", function(){
  makeMap()
});
