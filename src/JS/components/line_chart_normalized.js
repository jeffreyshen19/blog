import LineChart from "/dist/JS/components/line_chart.js";
import NormalizeHeader from "/dist/JS/components/subcomponents/normalize.js";

const e = React.createElement;

class LineChartNormalized extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      yvar: "total-quantity",
      normalize: "none"
    }

    this.onYVarChanged = this.onYVarChanged.bind(this);
    this.onNormalizeChanged = this.onNormalizeChanged.bind(this);
  }

  componentDidMount(){
    this.props.chart = d3.select(this.props.chart).select(".line-chart").node();

    this.setState({
      loaded: true
    });
  }

  onYVarChanged(e){
    this.setState({
      yvar: e.currentTarget.value
    });
  }

  onNormalizeChanged(e){
    this.setState({
      normalize: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <NormalizeHeader
          yvar = {this.state.yvar}
          normalize = {this.state.normalize}
          yVarHandler = {this.onYVarChanged}
          normalizeHandler = {this.onNormalizeChanged}
          id = "2"
        >
        </NormalizeHeader>
        <div class = "line-chart">
          { this.state.loaded ?
            <LineChart {...this.props}>
            </LineChart>
            :
            null
          }
        </div>
      </div>
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
