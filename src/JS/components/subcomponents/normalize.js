export default class NormalizeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class = 'normalize-header labels level'>
          <div class = "level-left">
            <div class = "level-item">
              <div>
                <span class = "heading">Show:</span>
                <input type="radio" name="yvar" id="total-quantity" value="total-quantity" checked={this.props.yvar === "total-quantity"} onChange={this.props.yVarHandler} /><label for = "total-quantity">Quantity of Items&nbsp;&nbsp;</label>
                <input type="radio" name="yvar" id="total-cost" value="total-cost" checked={this.props.yvar === "total-cost"} onChange={this.props.yVarHandler} /><label for = "total-cost">Cost of Items</label>
              </div>
            </div>
            <div class = "level-item">
              <div>
                <span class = "heading">Normalize by:</span>
                <input type="radio" name="normalize" id="none" value="none" checked={this.props.normalize === "none"} onChange={this.props.normalizeHandler}/><label for = "none">None&nbsp;&nbsp;</label>
                <input type="radio" name="normalize" id="population" value="population" checked={this.props.normalize === "population"} onChange={this.props.normalizeHandler}/><label for = "population">Population&nbsp;&nbsp;</label>
                <input type="radio" name="normalize" id="violent_crime_rate_per_100000_inhabitants" value="violent_crime_rate_per_100000_inhabitants" checked={this.props.normalize === "violent_crime_rate_per_100000_inhabitants"} onChange={this.props.normalizeHandler}/><label for = "violent_crime_rate_per_100000_inhabitants">Violent Crime Rate</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
