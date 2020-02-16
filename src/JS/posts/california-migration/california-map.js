class CaliforniaMap extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: this.props.chart,
      dataset: this.props,
      svg: null,
    };
  }

  componentDidMount(){
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
        d3.svg("/data/california-migration/california-counties.svg").then((res) => {
          var svg = res.documentElement;

          //Append map
          d3.select(this.state.chart).append("div").attr("class", "svg").style("text-align", "center").node().appendChild(svg);

          // Append tooltip
          d3.select(this.state.chart).select(".svg").append("div").attr("class", "tooltip hidden");

          this.setState({
            "svg": svg,
            "data": data
          })
        });
      })
  }

  getTooltipText(d){
    function formatNum(num){
      return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return "yo"
  }

  renderGraph(){
    var tooltipText,
        tooltip = d3.select(this.state.chart).select(".tooltip"),
        svg = this.state.svg,
        data = this.state.data;

    // Get radio options
    let getYVal = function(d){
      return d["net-exodus"]
    };

    // Get color scale
    var extent = d3.extent(data, (d) => getYVal(d));
    var colors = d3.scaleLinear().domain(extent)
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);

    let getTooltipText = this.getTooltipText;

    // Display SVG
    d3.select(svg)
      .style("height", "500px")
      .style("margin", "0 auto")
      .attr("viewBox", "0 0 700 700")
      .select("#polygons").selectAll("*")
        .data(data, function(d) { return d ? d.code : this.id; }) // Join data to corresponding county
        // // .style("transition", "0.1s")
        .style("fill", function(d, i){
          return "red";
          // return colors(getYVal(d));
        })
        // .on("mouseover", function(d, i){
        //   // Change color on hover
        //   d3.select(this).style("fill", d3.rgb(d3.color(colors(getYVal(d))).brighter(0.2)));
        //   tooltip.html(getTooltipText(d, yvar));
        // })
        // .on("mousemove", (d) => {
        //   var mouse = d3.mouse(this.state.chart.children[1]);
        //
        //   tooltip.classed("hidden", false).style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
        //     .style("top", mouse[1] + 20 + "px");
        // })
        // .on("mouseout", function(d){
        //   d3.select(this).style("fill", d3.rgb(colors(getYVal(d))));
        //   tooltip.classed("hidden", true);
        // });
  }

  render() {
    if(this.state.data.length && this.state.svg) this.renderGraph();

    return (
      null
    );
  }
}

const e = React.createElement;

// Render all charts
let elements = document.getElementsByClassName('california-map');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(CaliforniaMap, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
