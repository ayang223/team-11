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

createMetadata:function(data){
    var metadata = {};
    var focusarea = data.AndarDataOutput;
    var focusArr = []; 
    for (var i =0; i< focusarea.length; i++){
      if(focusArr.includes(focusarea[i].focus)){
        console.log("focus true")
      } else focusArr.push(focusarea[i].focus)
    }
    return focusArr;
  },  

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByFocusArea: ' + this.state.selectValue;
    var focusArr = this.createMetadata(dataFromDash);
    const listItems = focusArr.map((focus) =>
      <option key={focus} value={focus} style={{margin:"2px"}}>{focus}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select focus area</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByFocusArea;
