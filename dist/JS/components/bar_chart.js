function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Chart from "/dist/JS/components/chart.js";
const e = React.createElement;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  xScale(width, height) {
    // Returns the scale the x axis should use
    return d3.scaleBand().range([0, width]);
  }

  yScale(width, height) {
    // Returns the scale the y axis should use
    return d3.scaleLinear().range([height, 0]);
  }

  xAxisFormat(body_width, axis) {
    console.log("formatting x axis");
    axis.tickFormat(function (d) {
      d = d.split(" ");
      return d[0].charAt(0) + ". " + d[1];
    });
  }

  yAxisFormat(body_width, axis) {
    console.log("formatting");
    axis.tickFormat(d3.format(".2s"));
  }

  renderData(i, ycol, x, y, svg, state) {
    let data = state.data,
        dataset = state.dataset,
        chart = state.chart;
    var tooltip = chart.select(".tooltip"),
        labels = dataset.linelabels.split(","),
        ycols = dataset.ycols.split(","),
        commas = d3.format(",.0f"),
        offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2;
    svg.selectAll(".bar").data(data).enter().append("rect").style("fill", dataset.linecolors.split(",")[i]).attr("class", "bar").attr("x", function (d) {
      return x(d[xcol]);
    }).attr("width", x.bandwidth()).attr("y", function (d) {
      return y(d[ycol]);
    }).attr("height", function (d) {
      return height - y(d[ycol]);
    }).on("mousemove", function (d) {
      var mouse = d3.mouse(this);
      tooltip.classed("hidden", false).html("<strong>" + d[xcol] + "</strong><br>" + ycols.map(function (col, i) {
        return "<div class = 'tooltip-label'>" + labels[i] + ": " + commas(d[col]) + "</div>";
      }).join("")).style("left", (mouse[0] + tooltip.node().offsetWidth > width ? mouse[0] + 55 - tooltip.node().offsetWidth - offset : mouse[0] + 75 - offset) + "px").style("top", mouse[1] + 50 + "px");
    }).on("mouseout", function (d) {
      tooltip.classed("hidden", true);
    });
  }

  setXDomain(data, dataset) {
    return data.map(function (d) {
      return d[dataset.xcol];
    });
  }

  positionTooltip(mouse, tooltip, x, y, state) {
    return {
      "left": 20 + mouse[0] + tooltip.node().offsetWidth > state.width + state.margin.left + state.margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - state.offset : mouse[0] + 10 - state.offset,
      "top": y(0) - tooltip.node().offsetHeight + state.margin.top + 24
    };
  }

  render() {
    return React.createElement(Chart, _extends({}, this.props, {
      margin: {
        top: 5,
        right: 20,
        bottom: 20,
        left: 65
      },
      padding: {
        top: 40,
        right: 20,
        bottom: 40,
        left: 20
      },
      xScale: this.xScale,
      yScale: this.yScale,
      xAxisFormat: this.xAxisFormat,
      yAxisFormat: this.yAxisFormat,
      renderData: this.renderData,
      positionTooltip: this.positionTooltip,
      setXDomain: this.setXDomain,
      disableTooltip: true
    }));
  }

} // Render all bar charts


let elements = document.getElementsByClassName('bar-chart');

for (let i = 0; i < elements.length; i++) {
  ReactDOM.render(e(BarChart, { ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}