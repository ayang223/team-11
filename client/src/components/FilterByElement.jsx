var React = require('react');
var array = [];

var FilterByElement = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
  },
  handleChange: function(e){
    this.setState({selectValue: array});
    var newSelection = JSON.stringify(e.target.value);
    var isPresent = false;
    var i;
    for(i = 0; i < array.length; i++){
      if(newSelection === array[i]){
        isPresent = true;
      }
    }
    if(!isPresent){
      array.push(JSON.stringify(e.target.value));
    }
  },
  render:function(){
    var message = 'FilterByElement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select element</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
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
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByElement;
