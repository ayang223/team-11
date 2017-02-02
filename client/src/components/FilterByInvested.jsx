var React = require('react');

var FilterByInvested = React.createClass({
  getInitialState:function(){
    return {selectedValue: '0'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByInvested: ' + this.state.selectValue;
    return(
      <ul className="dropdown menu">
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="0">$0</option>
          <option value="100">$100</option>
          <option value="1000">$1000</option>
        </select>
        <p>{message}</p>
      </ul>
    )
  }
})

module.exports = FilterByInvested;
