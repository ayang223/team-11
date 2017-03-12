var React = require('react');
var array = [];

var FilterByCity = React.createClass({
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
    var message = 'FilterByCity: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select city</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          <option value="Vancouver">Vancouver</option>
          <option value="Richmond">Richmond</option>
          <option value="Burnaby">Burnaby</option>
          <option value="Surrey">Surrey</option>
          <option value="Delta">Delta</option>
          <option value="Langely">Langely</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByCity;
