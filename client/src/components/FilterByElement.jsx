var React = require('react');

var FilterByElement = React.createClass({
  getInitialState:function(){
    return {selectedValue: 'other'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByElement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="Learning Support">Learning Support</option>
          <option value="Social and Emotional Health">Social and Emotional Health </option>
          <option value="Connections/Healthy Relationships">Connections/Healthy Relationships</option>
          <option value="Physical Health and Recreational Activities">Physical Health and Recreational Activities</option>
          <option value="Life Skills">Life Skills</option>
          <option value="System Change ">System Change </option>
          <option value="Address Program Barriers/Access">Address Program Barriers/Access</option>
          <option value="Food Redistribution">Food Redistribution</option>
          <option value="Information and Referral">Information and Referral</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByElement;
