var React = require('react');

var FilterByAgency = React.createClass({
  getInitialState:function(){
    return {selectedValue: 'SUCCESS'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByAgency: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="YMCA of Greater Vancouver">YMCA of Greater Vancouver</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="Big Brothers of Greater Vancouver">Big Brothers of Greater Vancouver</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByAgency;
