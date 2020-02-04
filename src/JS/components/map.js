class Map extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: this.props.chart,
      dataset: this.props,
      svg: null
    };
  }

  componentDidMount(){
    // Append form inputs
    // d3.select(this.state.chart)
    //   .append("div")
    //   .attr("class", "labels level")
    //   .html(`
    //
    //   `)

    // d3.select(this.state.chart)
    //   .append("div")
    //   .attr("class", "tooltip hidden")

    d3.csv(this.state.dataset.csv)
      .then((values) => {
        // Process csv data into correct format
        let ycolumns = Object.keys(values[0]).slice(2);
        let data = values.map(function(d){
          ycolumns.forEach(function(ycol){
            d[ycol] = parseFloat(d[ycol]);
          });
          return d;
        });

        // Plot graph
        d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then((res) => {
          var svg = res.documentElement;
          d3.select(this.state.chart).node().appendChild(svg);

          this.setState({
            "svg": svg,
            "data": data
          })
        });
      })
  }

  renderGraph(){
    var tooltipText,
        tooltip = d3.select(this.state.chart).select(".tooltip"),
        svg = this.state.svg,
        data = this.state.data;


    // Get radio options
    let yvar = d3.select(this.state.chart).select('input[name="yvar"]:checked').node().value,
        normalize = d3.select(this.state.chart).select('input[name="normalize"]:checked').node().value;

    let getYVal = function(d){
      if(normalize == "none") return d[yvar]
      else return d[yvar] / d[normalize];
    };

    // Get color scale
    var extent = d3.extent(data, (d) => getYVal(d));
    var colors = d3.scaleLinear().domain(extent)
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);

    // Display SVG
    d3.select(svg)
      .style("width", "100%")
      .style("height", "100%")
      .attr("viewBox", "0 0 900 600")
      .select("#g4864").selectAll("*")
        .data(data, function(d) { return d ? d.state : this.className.baseVal.toUpperCase(); }) // Join svg this.state.charts to their corresponding state data
        .style("transition", "0.1s")
        .style("fill", function(d, i){
          return colors(getYVal(d));
        })
        .on("mouseover", function(d, i){
          // Change color on hover
          d3.select(this).style("fill", d3.rgb(d3.color(colors(getYVal(d))).brighter(0.3)));

          // Add tooltip text
          tooltipText = `
            <h1>${d["state-name"]}</h1>
            <
          `;
          tooltip.classed("hidden", false).html(tooltipText);
        })
        .on("mousemove", (d) => {
          var mouse = d3.mouse(this.state.chart.children[1]);

          tooltip.style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
            .style("top", mouse[1] - Math.round(tooltip.node().offsetHeight) - 10 + "px");
        })
        .on("mouseout", function(d){
          d3.select(this).style("fill", d3.rgb(colors(getYVal(d))));
          tooltip.classed("hidden", true);
        });
  }


  render() {
    if(this.state.data.length && this.state.svg) this.renderGraph();
    return (
      <div>
        <div class = "tooltip hidden">
        </div>
        <div class = 'labels level'>
          <div class = "level-left">
            <div class = "level-item">
              <div>
                <span class = "heading">Show:</span>
                <input type="radio" name="yvar" value="total-quantity" checked/><span>Quantity of Items&nbsp;&nbsp;</span>
                <input type="radio" name="yvar" value="total-cost"/><span>Cost of Items</span>
              </div>
            </div>
            <div class = "level-item">
              <div>
                <span class = "heading">Normalize by:</span>
                <input type="radio" name="normalize" value="none" checked/><span>None&nbsp;&nbsp;</span>
                <input type="radio" name="normalize" value="population"/><span>Population&nbsp;&nbsp;</span>
                <input type="radio" name="normalize" value="violent_crime_rate_per_100000_inhabitants"/><span>Violent Crime Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const e = React.createElement;

// Render all line charts
let elements = document.getElementsByClassName('map');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(Map, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
