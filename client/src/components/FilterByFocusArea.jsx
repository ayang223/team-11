var React = require('react');
var array = [];

var FilterByFocusArea = React.createClass({
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
    var message = 'FilterByFocusArea: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select focus area</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          <option value="All that Kids can Be">All that Kids can Be</option>
          <option value="Building Stronger Communities">Building Stronger Communities</option>
          <option value="Other">Other</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByFocusArea;
