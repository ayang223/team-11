var React = require('react');

var FilterByEngagement = React.createClass({
  getInitialState:function(){
    return {selectedValue: 'UW Speaker'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="UW Speaker">UW Speaker</option>
          <option value="Day of Caring">Day of Caring</option>
          <option value="Volunteer Opportunities">Volunteer Opportunities</option>
          <option value="Agency Tour">Agency Tour</option>
          <option value="Agency Fair">Agency Fair</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByEngagement;
