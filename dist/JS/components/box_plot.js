function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Chart from "/dist/JS/components/chart.js";
const e = React.createElement;

class BoxPlot extends React.Component {
  constructor(props) {
    super(props);
  }

  xScale(width, height) {
    // Returns the scale the x axis should use
    return d3.scaleLinear();
  }

  yScale(width, height) {
    // Returns the scale the y axis should use
    return d3.scaleBand();
  }

  parseXCol(val) {
    return val;
  }

  xAxisFormat(body_width, axis) {
    axis.tickFormat(d3.format(".2s"));
    if (body_width < 700) axis.ticks(4);
  }

  renderData(i, ycol, x, y, svg, state) {
    let data = state.data,
        dataset = state.dataset,
        chart = state.chart,
        fivenum = dataset.fivenum.split(",");
    svg.selectAll('g.box').data(data).enter().append('g').attr('class', 'box').attr('transform', function (d) {
      return "translate(" + x(d[fivenum[2]]) + "," + (y(d[dataset.xcol]) + 30) + ")"; //TODO
    }).each(function (d, i) {
      d3.select(this).append('line').attr('class', 'range').attr('x1', x(d[fivenum[4]]) - x(d[fivenum[2]])).attr('x2', x(d[fivenum[0]]) - x(d[fivenum[2]])).attr('y1', 0).attr('y2', 0).style('stroke', 'black').style('stroke-width', '4px');
      d3.select(this).append('line').attr('class', 'max').attr('x1', x(d[fivenum[4]]) - x(d[fivenum[2]])).attr('x2', x(d[fivenum[4]]) - x(d[fivenum[2]])).attr('y1', -10).attr('y2', 10).style('stroke', 'black').style('stroke-width', '4px');
      d3.select(this).append('line').attr('class', 'min').attr('x1', x(d[fivenum[0]]) - x(d[fivenum[2]])).attr('x2', x(d[fivenum[0]]) - x(d[fivenum[2]])).attr('y1', -10).attr('y2', 10).style('stroke', 'black').style('stroke-width', '4px');
      d3.select(this).append('rect').attr('class', 'range').attr('x', x(d[fivenum[1]]) - x(d[fivenum[2]])).attr('y', -10).attr('height', 20).attr('width', x(d[fivenum[3]]) - x(d[fivenum[1]])).style('fill', 'white').style('stroke', 'black').style('stroke-width', '2px');
      d3.select(this).append('line').attr('x1', 0).attr('x2', 0).attr('y1', -10).attr('y2', 10).style('stroke', 'darkgray').style('stroke-width', '4px');
    });
  }

  setXDomain(data, dataset) {
    var max = dataset.fivenum.split(",")[4];
    var ymax = d3.max(data, function (d) {
      return +d[max];
    });
    return [0, ymax];
  }

  setYDomain(data, dataset) {
    return data.map(function (d) {
      return d[dataset.xcol];
    });
  }

  render() {
    return React.createElement(Chart, _extends({}, this.props, {
      margin: {
        top: 5,
        right: 20,
        bottom: 20,
        left: 130
      },
      padding: {
        top: 40,
        right: 20,
        bottom: 40,
        left: 20
      },
      xScale: this.xScale,
      yScale: this.yScale,
      parseXCol: this.parseXCol,
      xAxisFormat: this.xAxisFormat,
      renderData: this.renderData,
      setXDomain: this.setXDomain,
      setYDomain: this.setYDomain,
      disableTooltip: true
    }));
  }

} // Render all bar charts


let elements = document.getElementsByClassName('box-plot');

for (let i = 0; i < elements.length; i++) {
  ReactDOM.render(e(BoxPlot, { ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}