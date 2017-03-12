var React = require('react');
var array = [];

var FilterByEngagement = React.createClass({
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
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select engagement</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
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
