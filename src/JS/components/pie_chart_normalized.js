import PieChart from "/dist/JS/components/pie_chart.js";
import NormalizeHeader from "/dist/JS/components/subcomponents/normalize.js";

const e = React.createElement;

class PieChartNormalized extends React.Component {
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
    this.props.chart = d3.select(this.props.chart).select(".pie-chart").node();

    this.setState({
      loaded: true
    });
  }

  onYVarChanged(e){
    this.setState({
      yvar: e.currentTarget.value
    });
  }

  getLabel(){
    for(var i = 0; i < this.props.ycols.length; i++){
      if(this.props.ycols[i].ycol == this.state.yvar) return this.props.ycols[i].label
    }
  }

  render() {
    let label = this.getLabel();

    return (
      <div>
        <NormalizeHeader
          yvar = {this.state.yvar}
          yVarHandler = {this.onYVarChanged}
          id = {this.props.id}
          ycols = {this.props.ycols}
        >
        </NormalizeHeader>
        <div class = "pie-chart">
          { this.state.loaded ?
            <PieChart {...this.props}
              ycol = {this.state.yvar}
              ylabel = {label}
              linelabels = {label}
            >
            </PieChart>
            :
            null
          }
        </div>
      </div>
    );
  }
}

// Render all pie charts
let elements = document.getElementsByClassName('pie-chart-normalized');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(PieChartNormalized, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
