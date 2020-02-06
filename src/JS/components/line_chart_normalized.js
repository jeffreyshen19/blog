import LineChart from "/dist/JS/components/line_chart.js";
import NormalizeHeader from "/dist/JS/components/subcomponents/normalize.js";

const e = React.createElement;

class LineChartNormalized extends React.Component {
  constructor(props) {
    super(props);
    this.onYVarChanged = this.onYVarChanged.bind(this);
    this.props.ycols = JSON.parse(this.props.ycols);

    this.state = {
      loaded: false,
      yvar: this.props.ycols[0].ycol,
    }
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

  getLabelAndTitle(){
    for(var i = 0; i < this.props.ycols.length; i++){
      if(this.props.ycols[i].ycol == this.state.yvar) return {
        label: this.props.ycols[i].label,
        title: this.props.ycols[i].title,
      }
    }
  }

  getTitle(){
    for(var i = 0; i < this.props.ycols.length; i++){
      if(this.props.ycols[i].ycol == this.state.yvar) return this.props.ycols[i].title;
    }
    (this.state.yvar == "total-cost" ? "Cost" : "Quantity") + " of Items Acquired, Over Time"
  }

  render() {
    let {label, title} = this.getLabelAndTitle();

    return (
      <div>
        <NormalizeHeader
          yvar = {this.state.yvar}
          yVarHandler = {this.onYVarChanged}
          id = {this.props.id}
          ycols = {this.props.ycols}
        >
        </NormalizeHeader>
        <div class = "line-chart">
          { this.state.loaded ?
            <LineChart {...this.props}
              ycols = {this.state.yvar}
              ylabel = {label}
              linelabels = {label}
              yaxisformat = {this.state.yvar == "total-cost" ? "$.2s" : ".2s"}
              title = {title}
            >
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
