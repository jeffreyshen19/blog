import Chart from "/dist/JS/components/chart.js"

const e = React.createElement;

class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  xScale(width, height){ // Returns the scale the x axis should use
    return d3.scaleTime().range([0, width]);
  }

  yScale(width, height){ // Returns the scale the y axis should use
    return d3.scaleLinear().range([height, 0]);
  }

  setTicks(body_width, axis){
    if(body_width < 400) axis.ticks(d3.timeYear.every(8));
    else if(body_width < 800) axis.ticks(d3.timeYear.every(4));
    else axis.ticks(d3.timeYear.every(2));
  }

  render() {
    return (
      <Chart {...this.props}
        margin = {{top: 5, right: 20, bottom: 20, left: 65}}
        padding = {{top: 40, right: 20, bottom: 40, left: 20}}
        xScale = {this.xScale}
        yScale = {this.yScale}
        setTicks = {this.setTicks}
        >
      </Chart>
    );
  }
}

// Render all line charts
let elements = document.getElementsByClassName('line-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(LineChart, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
