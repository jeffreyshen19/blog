export default class NormalizeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ycols = this.props.ycols;

    return (
      <div>
        <div class = 'normalize-header labels level'>
          <div class = "level-left">
            {
              this.props.yvar ?
              <div class = "level-item">
                <div>
                  <span class = "heading">Show:</span>
                  {
                    ycols.map((d) => {
                      return <React.Fragment><input type="radio" name = {"yvar-" + this.props.id} id =  {d.ycol} value = {d.ycol} checked = {this.props.yvar === d.ycol} onChange= {this.props.yVarHandler} /><label for = {d.ycol}>{d.label}</label></React.Fragment>
                    })
                  }
                </div>
              </div>
              : null
            }
            {
              this.props.normalize ?
              <div class = "level-item">
                <div>
                  <span class = "heading">Normalize by:</span>
                  <input type="radio" name={"normalize-" + this.props.id} id="none" value="none" checked={this.props.normalize === "none"} onChange={this.props.normalizeHandler}/><label for = "none">None&nbsp;&nbsp;</label>
                  <input type="radio" name={"normalize-" + this.props.id} id="population" value="population" checked={this.props.normalize === "population"} onChange={this.props.normalizeHandler}/><label for = "population">Population&nbsp;&nbsp;</label>
                  <input type="radio" name={"normalize-" + this.props.id} id="violent_crime_rate_per_100000_inhabitants" value="violent_crime_rate_per_100000_inhabitants" checked={this.props.normalize === "violent_crime_rate_per_100000_inhabitants"} onChange={this.props.normalizeHandler}/><label for = "violent_crime_rate_per_100000_inhabitants">Violent Crime Rate</label>
                </div>
              </div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}
