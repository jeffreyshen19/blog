export default class PieChart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: null,
      width: 0,
      dataset: props
    };

    // Load data from csv
    d3.csv(props.csv).then((values) => {
      //Process csv data into correct format
      let data = values.map(function(d){
        d[props.ycol] = parseFloat(d[props.ycol]);
        return d;
      }).sort(function(a, b){
        return a[props.ycol] - b[props.ycol];
      })

      this.setState({
        data: data
      })
    })
  }

  componentDidMount(){
    // Add D3 selector to state
    let chart = d3.select(this.props.chart);
    this.setState({
      chart: chart
    });
  }

  formatTooltipData(x){
    return (this.props.ycol == "Cost" ? "$" : "") + parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderGraph(){
    let ycol = this.props.ycol,
        xcol = this.props.xcol,
        data = this.state.data,
        chart = this.state.chart,
        formatTooltipData = this.formatTooltipData.bind(this),
        radius = 150,
        height = radius * 2,
        width = radius * 2;

    //Assign colors to each slice
    var colors = d3.scaleLinear().domain([0, data.length - 1])
      .interpolate(d3.interpolateHcl)
      .range(this.props.colorrange.split(",").map(function(d){
        return d3.rgb(d);
      }));

    var tooltip = chart.append("div")
      .attr("class", "tooltip hidden");

    var pie = d3.pie()
      .value(function(d){
        return d[ycol];
      }).sort(null);

    var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius / 2);

    chart.attr("class", "pie-chart columns is-vcentered is-centered").style("position", "relative");

    let mouseContainer = chart.node();

    var myChart = chart.append("div")
      .attr("class", "column is-narrow")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + (width - radius) + "," + (height - radius) + ")")
          .selectAll("path").data(pie(data))
          .enter().append("path")
            .attr("fill", function(d, i){
              return colors(i);
            })
            .attr("stroke", "white")
            .style("transition", "0.2s")
            .attr("d", arc)
              .on("mouseover", function(d, i){
                tooltip.classed("hidden", false).html(`
                  <h1>${d.data[xcol]}</h1>
                  ${ycol}: ${formatTooltipData(d.data[ycol])}
                `);
                d3.select(this).style("fill", d3.rgb(d3.color(colors(i)).brighter(0.5)));
              })
              .on("mousemove", function(d){
                let mouse = d3.mouse(mouseContainer);

                tooltip.style("left", mouse[0] + 20 + "px")
                  .style("top", mouse[1] + 20 + "px");
              })
              .on("mouseout", function(d, i){
                tooltip.classed("hidden", true);
                d3.select(this).style("fill", colors(i));
              });

    var pieLabel = chart.append("div")
      .attr("class", "pie-label column is-narrow");

    pieLabel.selectAll("span").data(data)
      .enter().append("div")
        .html(function(d, i){
          return `
            <div class = 'bubble' style = 'background:${colors(i)}'></div><span>${d[xcol]}</span>
          `;
        });
  }

  render() {
    if(this.state.data.length && this.state.chart) this.renderGraph();
    return (null);
  }
}

const e = React.createElement;

// Render all line charts
let elements = document.getElementsByClassName('pie-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(PieChart, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
