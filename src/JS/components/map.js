d3.selectAll(".map").each(function(){
  var tooltipText,
      tooltip = d3.select(this).select(".tooltip");

  let yvar = "total-cost", // Which variable to display on the map
      normalization = "none";

  // Append form inputs
  d3.select(this)
    .append("div")
    .attr("class", "labels level")
    .html(`
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
            <input type="radio" name="normalize" value="population" checked>Population&nbsp;&nbsp;
            <input type="radio" name="normalize" value="violent_crime_rate_per_100000_inhabitants">Violent Crime Rate
          </div>
        </div>
      </div>
    `)

  d3.csv(this.dataset.csv)
    .then((values) => {
      // Process csv data into correct format
      let ycolumns = Object.keys(values[0]).slice(2);
      let data = values.map(function(d){
        ycolumns.forEach(function(ycol){
          d[ycol] = parseFloat(d[ycol]);
        });
        return d;
      });

      // Get color scale
      var extent = d3.extent(data, (d) => d["total-cost"]);
      var colors = d3.scaleLinear().domain(extent)
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);

      // Display SVG
      d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then((res) => {
        var svg = res.documentElement;
        d3.select(this).node().appendChild(svg);
        d3.select(svg)
          .style("width", "100%")
          .style("height", "100%")
          .attr("viewBox", "0 0 900 600")
          .select("#g4864").selectAll("*")
            .data(data, function(d) { return d ? d.state : this.className.baseVal.toUpperCase(); }) // Join svg elements to their corresponding state data
            .style("transition", "0.1s")
            .style("fill", function(d, i){
              return colors(d["total-cost"]);
            })
            .on("mouseover", function(d, i){
              // Change color on hover
              d3.select(this).style("fill", d3.rgb(d3.color(colors(d["total-cost"])).brighter(0.3)));

              // Add tooltip text
              tooltipText = `
                <h1>${d["state-name"]}</h1>
                <
              `;
              tooltip.classed("hidden", false).html(tooltipText);
            })
            .on("mousemove", (d) => {
              var mouse = d3.mouse(this.children[1]);

              tooltip.style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
                .style("top", mouse[1] - Math.round(tooltip.node().offsetHeight) - 10 + "px");
            })
            .on("mouseout", function(d){
              d3.select(this).style("fill", d3.rgb(colors(d["total-cost"])));
              tooltip.classed("hidden", true);
            });
      });
    })

});
