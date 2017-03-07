var React = require('react');

var FilterByEngagement = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select engagement</label>
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="UW Speaker">UW Speaker</option>
          <option value="Day of Caring">Day of Caring</option>
          <option value="Volunteer Opportunities">Volunteer Opportunities</option>
          <option value="Agency Tour">Agency Tour</option>
          <option value="Agency Fair">Agency Fair</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByEngagement;
