import Chart from "/dist/JS/components/chart.js";

const e = React.createElement;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  xScale(width, height){ // Returns the scale the x axis should use
    return d3.scaleBand();
  }

  yScale(width, height){ // Returns the scale the y axis should use
    return d3.scaleLinear();
  }

  parseXCol(val){
    return val;
  }

  xAxisFormat(body_width, axis){
    axis.tickFormat(function(d){
      d = d.split(" ");
      return d[0].charAt(0) + ". " + d[1];
    });
  }

  yAxisFormat(body_width, axis){
    axis.tickFormat(d3.format(".2s"));
  }

  renderData(i, ycol, x, y, svg, state){
    let data = state.data,
        dataset = state.dataset,
        chart = state.chart;

    var tooltip = chart.select(".tooltip"),
        labels = dataset.linelabels.split(","),
        ycols = dataset.ycols.split(","),
        commas = d3.format(",.0f"),
        offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2;

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .style("fill", dataset.linecolors.split(",")[i])
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[dataset.xcol]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[ycol]); })
        .attr("height", function(d) { return state.height - y(d[ycol]); })
        .on("mousemove", function(d){
          var mouse = d3.mouse(this);
          tooltip
            .classed("hidden", false)
            .html("<strong>" + d[dataset.xcol] + "</strong><br>" + ycols.map(function(col, i){
                return "<div class = 'tooltip-label'>" + labels[i] + ": " + commas(d[col]) + "</div>";
            }).join(""))
            .style("left", (mouse[0] + tooltip.node().offsetWidth > state.width ? mouse[0] + 55 - tooltip.node().offsetWidth - offset: mouse[0] + 75 - offset) + "px")
            .style("top", mouse[1] + 50 + "px");
        })
        .on("mouseout", function(d){ tooltip.classed("hidden", true);});
  }

  setXDomain(data, dataset){
    return data.map(function(d){ return d[dataset.xcol]; });
  }

  render() {
    return (
      <Chart {...this.props}
        margin = {{top: 5, right: 20, bottom: 20, left: 65}}
        padding = {{top: 40, right: 20, bottom: 40, left: 20}}
        xScale = {this.xScale}
        yScale = {this.yScale}
        parseXCol = {this.parseXCol}
        xAxisFormat = {this.xAxisFormat}
        yAxisFormat = {this.yAxisFormat}
        renderData = {this.renderData}
        setXDomain = {this.setXDomain}
        disableTooltip = {true}
        >
      </Chart>
    );
  }
}

// Render all bar charts
let elements = document.getElementsByClassName('bar-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(BarChart, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
