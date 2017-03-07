var React = require('react');

var FilterByInvested = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByInvested: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select Invested</label>
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="less than $5000">less than $5000</option>
          <option value="$5000-$10000">$5000-$10000</option>
          <option value="$10000-$50000">$10000-$50000</option>
          <option value="$50000-$100000">$50000-$100000</option>
          <option value="$100000-$250000">$100000-$250000</option>
          <option value="$250000-$500000">$250000-$500000</option>
          <option value="$50000-$1000000">$50000-$1000000</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByInvested;
