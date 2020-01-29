/*
  Parent class for all D3 charts.

  Props:
    * margin (required): object with integer fields top, left, right, bottom
    * padding (required): object with integer fields top, left, right, bottom
    * parseXCol (required): method that takes xcol and converts it into a different form
    * height (required): integer height of the visualization
    * xScale (required): method which takes integer params width, height and returns the scale for the x axis
    * yScale (required): method which takes integer params width, height and returns the scale for the y axis
    * xAxisFormat (optional): method which takes body_width, axis and formats the x axis
    * yAxisFormat (optional): method which takes body_width, axis and formats the y axis
    * setXDomain (optional): method which takes data, dataset and sets the domain of the x axis
    * setYDomain (optional): method which takes data, dataset and sets the domain of the y axis
    * renderData (required): method which takes i, ycol, x, y, svg, state and specifies how to draw the graph, given each ycol.
    * useTooltipLine (optional): boolean, display a vertical line with the tooltip
    * positionTooltip (required): method which takes mouse, tooltip, x, y, state and outputs an object with integer fields x, y telling how the tooltip should be positioned
    * formatTooltip (required): method which the data point and formats how the tooltip should be displayed
*/
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chart: null,
      width: 0,
      margin: props.margin,
      padding: props.padding,
      height: (props.height || 300) - props.margin.top - props.margin.bottom,
      offset: 0,
      body_width: 0,
      dataset: props
    }; // Load data from csv

    d3.csv(props.csv).then(values => {
      this.setState({
        data: values.map(function (d) {
          //Process csv data into correct format
          d[props.xcol] = props.parseXCol(d[props.xcol]);
          props.ycols.split(",").forEach(function (ycol) {
            d[ycol] = parseFloat(d[ycol]);
          });
          return d;
        })
      });
    });
  }

  updateDimensions() {
    //Calculate new width
    let offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2,
        body_width = d3.select("body").node().offsetWidth,
        width = d3.select("#body").node().offsetWidth - this.state.margin.left - this.state.margin.right - this.state.padding.left - this.state.padding.right + 2 * offset;
    this.setState({
      width: width,
      offset: offset,
      body_width: body_width
    });
  }

  componentDidMount() {
    // Handle resize
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this)); // Add D3 selector to state

    let chart = d3.select(this.props.chart);
    this.setState({
      chart: chart
    });
  }

  renderGraph() {
    let margin = this.state.margin,
        padding = this.state.padding,
        dataset = this.state.dataset,
        chart = this.state.chart,
        data = this.state.data,
        width = this.state.width,
        height = this.state.height,
        offset = this.state.offset,
        body_width = this.state.body_width; // Set the ranges

    var x = this.props.xScale(width, height).range([0, width]),
        y = this.props.yScale(width, height).range([height, 0]); // Define axes

    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y); // Reset canvas

    chart.selectAll("*").remove(); // Create canvas

    var svg = chart.append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).style("transform", "translate(-" + offset + "px,0px)").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Add tooltip and tooltip line

    chart.append("div").attr("class", "tooltip hidden"); // Fit Domain

    var ymax = d3.max(data, function (d) {
      return Math.max(...dataset.ycols.split(",").map(function (ycol) {
        return d[ycol];
      }));
    });
    var xextent = d3.extent(data, function (d) {
      return d[dataset.xcol];
    });
    if (this.props.setXDomain) x.domain(this.props.setXDomain(data, dataset));else x.domain(xextent);
    if (this.props.setYDomain) y.domain(this.props.setYDomain(data, dataset));else y.domain([0, ymax]); // Set how ticks should appear

    if (this.props.xAxisFormat) this.props.xAxisFormat(body_width, xAxis);
    if (this.props.yAxisFormat) this.props.yAxisFormat(body_width, yAxis); // Render data

    let state = this.state;
    dataset.ycols.split(",").forEach((ycol, i) => {
      this.props.renderData(i, ycol, x, y, svg, state);
    }); // Add X Axis

    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis); // Add the Y Axis

    svg.append("g").attr("class", "y axis").call(yAxis); // Chart title

    chart.insert("p", ":first-child").html(dataset.title).attr("class", "axis-label title"); // X Axis Label

    chart.append("p").attr("class", "axis-label").style("text-align", "center").html(dataset.xlabel); // Y Axis Label

    svg.append("text").attr("transform", "rotate(-90)").attr("class", "axis-label").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").text(dataset.ylabel); // Add legend if there are multiple lines

    if (dataset.ycols.split(",").length > 1) {
      chart.append("div").attr("class", "legend").selectAll(".legend-label").data(dataset.linelabels.split(",").map(function (e, i) {
        return {
          "color": dataset.linecolors.split(",")[i],
          "label": e
        };
      })).enter().append('div').attr("class", "legend-label").html(function (d, i) {
        return "<div class = 'bubble' style = 'background-color:" + d.color + "'></div><span>" + d.label + "</span>";
      });
    }
    /*
      TOOLTIP
    */


    var ycols = dataset.ycols.split(","),
        colors = dataset.linecolors.split(","),
        labels = dataset.linelabels.split(","),
        useTooltipLine = this.props.useTooltipLine,
        positionTooltip = this.props.positionTooltip,
        formatTooltip = this.props.formatTooltip;
    if (useTooltipLine) svg.append("line").attr("class", "tooltip-line hidden").attr("x1", x(xextent[0])).attr("y1", y(0)).attr("x2", x(xextent[0])).attr("y2", y(ymax)).style("stroke", "black").style("stroke-width", "1").style("stroke-dasharray", "5,5");
    var tooltip = chart.select(".tooltip"),
        tooltipLine;
    if (useTooltipLine) tooltipLine = chart.select(".tooltip-line");
    var bisect = d3.bisector(function (d) {
      return d[dataset.xcol];
    }).right;

    if (this.props.disableTooltip == null) {
      chart.select("svg").on("mousemove", function () {
        var mouse = d3.mouse(this),
            mouseX = x.invert(mouse[0] - margin.left),
            index = bisect(data, mouseX),
            datum = data[index];

        if (datum == null) {
          tooltip.classed("hidden", true);
          tooltipLine.classed("hidden", true);
        } else {
          if (useTooltipLine) tooltipLine.attr("x1", x(datum[dataset.xcol])).attr("x2", x(datum[dataset.xcol])).classed("hidden", false);
          tooltip.classed("hidden", false).html("<strong>" + formatTooltip(datum[dataset.xcol]) + "</strong><br>" + ycols.map(function (d, i) {
            return "<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:" + colors[i] + "'></div>" + labels[i] + ": " + datum[d].toFixed(2) + "</div>";
          }).join("")).style("left", positionTooltip(mouse, tooltip, x, y, state).left + "px").style("top", positionTooltip(mouse, tooltip, x, y, state).top + "px");
        }
      }).on("mouseout", function (d) {
        tooltip.classed("hidden", true);
        if (useTooltipLine) tooltipLine.classed("hidden", true);
      });
    }
  }

  render() {
    if (this.state.data.length && this.state.chart) this.renderGraph();
    return null;
  }

}