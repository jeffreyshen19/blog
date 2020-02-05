import LineChart from "/dist/JS/components/line_chart.js";

const e = React.createElement;

class LineChartNormalized extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LineChart {...this.props}>
      </LineChart>
    );
  }
}

// Render all line charts
let elements = document.getElementsByClassName('line-chart-normalized');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(LineChartNormalized, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
