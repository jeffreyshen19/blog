const e = React.createElement;

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <p>This is a line chart</p>
    );
  }
}

let elements = document.getElementsByClassName('line-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(LineChart), elements[i]);
}
