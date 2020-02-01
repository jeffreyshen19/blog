d3.selectAll(".map").each(function(){
  var tooltipText,
      tooltip = d3.select(this.firstChild);

  d3.csv(this.dataset.csv)
    .then((values) => {
      // Process csv data into correct format
      let ycolumns = Object.keys(values[0]).slice(1);
      let data = values.map(function(d){
        ycolumns.forEach(function(ycol){
          d[ycol] = parseFloat(d[ycol]);
        });
        return d;
      });

      // Get color scale from data
      var extent = d3.extent(data, (d) => d["total-cost"]);
      var colors = d3.scaleLinear().domain(extent)
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);;

      // Display SVG
      d3.svg("/data/police-militarization/us-map-w-territories.svg").then((res) => {
        console.log(res.documentElement);
        var svg = res.documentElement;
        d3.select(this).node().appendChild(svg);
        d3.select(svg).select(".state").selectAll("*")
          .data(data, function(d) { return d ? d.state : this.id; }) // Join svg elements to their corresponding state dataa
          .style("fill", function(d, i){
            return colors(d["total-cost"])
          })
          .on("mouseover", function(d, i){
            console.log(d);
            // d3.select(this).style("fill", d3.rgb(accent.brighter(0.3)));
            // tooltipText = generateTooltip({title: d.name, responses: d.responses, percentage: d.responses / total});
            // tooltip.classed("hidden", false).html(tooltipText);
          })
          // .on("mousemove", function(d){
          //   var mouse = d3.mouse(currentElement);
          //
          //   tooltip.style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
          //     .style("top", mouse[1] - Math.round(tooltip.node().offsetHeight) - 10 + "px");
          // })
          // .on("mouseout", function(d){
          //   d3.select(this).style("fill", d3.rgb(d.color));
          //   tooltip.classed("hidden", true);
          // });
      });
    })

});