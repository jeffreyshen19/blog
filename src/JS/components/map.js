d3.selectAll(".map").each(function(){
  // var total = 0,
  //     regionNames = ["Discontinuous", "Northeast", "Southeast", "Southwest", "West", "Midwest", "International"];
  //
  // var accent = d3.color(this.dataset.accent);
  //
  // var colors = ["#abdde3","#74cee0","#42b6da","#1e8cb9","#13659d","#0c3d8b","#182552"];
  //
  // var responses = this.dataset.responses.split(",").map(function(element, i){
  //   total += parseInt(element);
  //   return {
  //     responses: parseInt(element),
  //     name: regionNames[i]
  //   };
  // });
  //
  // var colorSort = responses.slice().sort(function(a, b) {
  //   return a.responses - b.responses;
  // });
  //
  // responses = responses.map(function(element, i){
  //   return {
  //     responses: element.responses,
  //     name: element.name,
  //     color: colors[colorSort.indexOf(element)]
  //   };
  // });

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

      // Display SVG
      d3.svg("/data/police-militarization/us-map-w-territories.svg").then((res) => {
        console.log(res.documentElement);
        var svg = res.documentElement;
        d3.select(this).node().appendChild(svg);
        d3.select(svg).select(".state").selectAll("*")
          .data(data, function(d) { return d ? d.state : this.id; })
          // .data(data)
          // .data(data, function(d){ //Match svg ids with data ids
          //   console.log(d);
          //   return this.id || d.state;
          // })
          .style("fill", function(d, i){
            // if(d.state == "AK") return "#ff0000";
            // else return "#00000"
            return "#00ff00"
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
