var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

d3.selectAll(".map").each(function(){
  var tooltipText,
      tooltip = d3.select(this).select(".tooltip");

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

      // Get color scale
      var extent = d3.extent(data, (d) => d["total-cost"]);
      var colors = d3.scaleLinear().domain(extent)
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);

      // Display SVG
      d3.svg("/data/police-militarization/us-map-w-territories.svg").then((res) => {
        var svg = res.documentElement;
        d3.select(this).node().appendChild(svg);
        d3.select(svg)
          .style("width", "100%")
          .style("height", "100%")
          .attr("viewBox", "0 0 900 600")
          .select(".state").selectAll("*")
            .data(data, function(d) { return d ? d.state : this.id; }) // Join svg elements to their corresponding state data
            .style("transition", "0.1s")
            .style("fill", function(d, i){
              return colors(d["total-cost"]);
            })
            .on("mouseover", function(d, i){
              // Change color on hover
              d3.select(this).style("fill", d3.rgb(d3.color(colors(d["total-cost"])).brighter(0.3)));

              // Add tooltip text
              tooltipText = `
                <h1>${states[d.state]}</h1>
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
