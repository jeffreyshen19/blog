export default class Chart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: null,
      width: 0,
      margin: this.props.margin,
      padding: this.props.padding,
      height: (props.height || 300) - this.props.margin.top - this.props.margin.bottom,
      offset: 0,
      body_width: 0,
    };

    // Load data from csv
    d3.csv(props.csv).then((values) => {
      this.setState({
        data: values.map(function(d){ //Process csv data into correct format
          d[props.xcol] = d3.timeParse("%Y-%m-%d")(d[props.xcol]);
          props.ycols.split(",").forEach(function(ycol){
            d[ycol] = parseFloat(d[ycol]);
          });
          return d;
        })
      })
    })
  }

  updateDimensions() { //Calculate new width
    let offset = (d3.select("body").node().offsetWidth -  d3.select("#body").node().offsetWidth) / 2,
        body_width = d3.select("body").node().offsetWidth,
        width = d3.select("#body").node().offsetWidth - this.state.margin.left - this.state.margin.right - this.state.padding.left - this.state.padding.right + 2 * offset;

    this.setState({
      width: width,
      offset: offset,
      body_width: body_width,
    })
  }

  componentDidMount(){
    // Handle resize
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    // Add D3 selector to state
    let chart = d3.select(this.props.chart);
    this.setState({
      chart: chart
    });
  }

  renderGraph(){
    let margin = this.state.margin,
        padding = this.state.padding,
        dataset = this.props,
        chart = this.state.chart,
        data = this.state.data,
        width = this.state.width,
        height = this.state.height,
        offset = this.state.offset,
        body_width = this.state.body_width;

    // Set the ranges
    var	x = this.props.xScale(width, height),
        y = this.props.yScale(width, height);

    // Define axes
    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y);

    // Set how ticks should behave responsively
    if(this.props.setTicks) this.props.setTicks(body_width, xAxis);

    // Reset canvas
    chart.selectAll("*").remove();

    // Create canvas
    var	svg = chart
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("transform", "translate(-" + offset + "px,0px)")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add tooltip and tooltip line
    chart.append("div")
      .attr("class", "tooltip hidden");

    // Fit Domain
    var ymax = d3.max(data, function(d) {
      return Math.max(...dataset.ycols.split(",").map(function(ycol){
        return d[ycol];
      }));
    });
    var xextent = d3.extent(data, function(d) { return d[dataset.xcol]; });
    x.domain(xextent);
    y.domain([0, ymax]);

    // Render data
    let colors = dataset.linecolors.split(",");
    dataset.ycols.split(",").forEach(function(ycol, i){
      var	valueline = d3.line()
        .x(function(d) { return x(d[dataset.xcol]); })
        .y(function(d) { return y(d[ycol]); });

      svg.append("path")
        .attr("class", "line")
        .style("stroke", colors[i])
        .attr("d", valueline(data));
    });

    // Add X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // Chart title
    chart.insert("p", ":first-child")
      .html(dataset.title)
      .attr("class", "axis-label title");

    // X Axis Label
    chart.append("p")
      .attr("class", "axis-label")
      .style("text-align", "center")
      .html(dataset.xlabel);

    // Y Axis Label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "axis-label")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .text(dataset.ylabel);

    /*
      TOOLTIP
    */

    var ycols = dataset.ycols.split(","),
        labels = dataset.linelabels.split(",");

    svg.append("line")
      .attr("class", "tooltip-line hidden")
      .attr("x1", x(xextent[0]))
      .attr("y1", y(0))
      .attr("x2", x(xextent[0]))
      .attr("y2", y(ymax))
      .style("stroke", "black")
      .style("stroke-width", "1")
      .style("stroke-dasharray", "5,5");

    var tooltip = chart.select(".tooltip"),
        tooltipLine = chart.select(".tooltip-line");

    var bisect = d3.bisector(function(d){ return d[dataset.xcol]; }).right;

    let positionTooltip = (mouse, tooltip, x, y) => {
      return {
        "left": (20 + mouse[0] + tooltip.node().offsetWidth > this.state.width + this.state.margin.left + this.state.margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - this.state.offset: mouse[0] + 10 - this.state.offset),
        "top": y(0) - tooltip.node().offsetHeight + this.state.margin.top + 24,
      };
    }

    chart.select("svg").on("mousemove", function(){
      var mouse = d3.mouse(this),
          mouseX = x.invert(mouse[0] - margin.left),
          index = bisect(data, mouseX),
          datum = data[index];

      if(datum == null){
        tooltip.classed("hidden", true);
        tooltipLine.classed("hidden", true);
      }
      else{
        tooltipLine.attr("x1", x(datum[dataset.xcol]))
          .attr("x2", x(datum[dataset.xcol]))
          .classed("hidden", false);

        tooltip.classed("hidden", false)
          .html("<strong>" + d3.timeFormat("%b %e, %Y")(datum[dataset.xcol]) + "</strong><br>" + ycols.map(function(d, i){
            return "<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:" + colors[i] + "'></div>" + labels[i] + ": " + datum[d].toFixed(2) + "</div>";
          }).join(""))
          .style("left", positionTooltip(mouse, tooltip, x, y).left + "px")
          .style("top", positionTooltip(mouse, tooltip, x, y).top + "px");
      }
    }).on("mouseout", function(d){
      tooltip.classed("hidden", true);
      tooltipLine.classed("hidden", true);
    });
  }


  render() {
    if(this.state.data.length && this.state.chart) this.renderGraph();
    return (null);
  }
}
