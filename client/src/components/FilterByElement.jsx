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
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="learning">Learning Support</option>
          <option value="social">Social and Emotional Health </option>
          <option value="connections">Connections/Healthy Relationships</option>
          <option value="health">Physical Health and Recreational Activities</option>
          <option value="life">Life Skills</option>
          <option value="system">System Change </option>
          <option value="address">Address Program Barriers/Access</option>
          <option value="food">Food Redistribution</option>
          <option value="information">Information and Referral</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByElement;
