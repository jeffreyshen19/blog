export default class PieChart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: null,
      width: 0,
      dataset: props
    };

    // Load data from csv
    d3.csv(props.csv).then((values) => {
      //Process csv data into correct format
      let data = values.map(function(d){
        d[props.ycol] = parseFloat(d[props.ycol]);
        return d;
      })

      this.setState({
        data: data
      })
    })
  }

  componentDidMount(){
    // Add D3 selector to state
    let chart = d3.select(this.props.chart);
    this.setState({
      chart: chart
    });
  }

  renderGraph(){
    let ycol = this.props.ycol,
        xcol = this.props.xcol,
        data = this.state.data,
        chart = this.state.chart,
        radius = 150,
        height = radius * 2,
        width = radius * 2;

    //Assign colors to each slice
    var colors = d3.scaleLinear().domain([0, data.length - 1])
      .interpolate(d3.interpolateHcl)
      .range(this.props.colorrange.split(",").map(function(d){
        return d3.rgb(d);
      }));

    var tooltip = chart.append("div")
      .attr("class", "tooltip hidden");

    var pie = d3.pie()
      .value(function(d){
        return d[ycol];
      }).sort(null);

    var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius / 2);

    chart.style("width", width);

    var myChart = chart.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + (width - radius) + "," + (height - radius) + ")")
        .selectAll("path").data(pie(data))
        .enter().append("path")
          .attr("fill", function(d, i){
            // colors(d.data[xcol]);
            return colors(i);
          })
          .attr("stroke", "white")
          .attr("d", arc)
  //         .on("mouseover", function(d, i){
  //           tooltipText = generateTooltip({title: d.data.label, responses: d.value, percentage: d.value / total});
  //           tooltip.classed("hidden", false).html(tooltipText);
  //         })
  //         .on("mousemove", function(d){
  //           mouse = d3.mouse(currentElement);
  //
  //           tooltip.style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
  //             .style("top", mouse[1] - Math.round(tooltip.node().offsetHeight) - 12 + "px");
  //
  //           d3.select(this).style("fill", d3.rgb(d3.color(d.data.color).brighter(0.5)));
  //         })
  //         .on("mouseout", function(d){
  //           tooltip.classed("hidden", true);
  //           d3.select(this).style("fill", d.color);
  //         });
  //
  // //Add labels underneath pie chart
  // var pieLabel = d3.select(this).append("div")
  //   .attr("class", "pie-label")
  //   .style("width", width + "px");
  //
  // if(name) pieLabel.append("h3").html(name);
  //
  // pieLabel.selectAll("span").data(piedata)
  //   .enter().append("span")
  //     .html(function(d, i){
  //       return "<div class = 'bubble' style = 'background:" + d.color + "'></div>" + d.label;
  //     }).append("br");
  }

  render() {
    if(this.state.data.length && this.state.chart) this.renderGraph();
    return (null);
  }
}

const e = React.createElement;

// Render all line charts
let elements = document.getElementsByClassName('pie-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(PieChart, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
