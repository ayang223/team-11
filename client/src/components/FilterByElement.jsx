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

  createMetaData:function(data){
    var metadata = {};
    var elements = data.ProgramElement;
    var subelements = data.ProgramSubElement;
    var elementArr = [];
    for(var i = 0; i< elements.length; i++ ){
      if(elementArr.includes(elements[i].element)){
        console.log("element true")
      }else elementArr.push(elements[i].element)
    }
    for(var i = 0; i< subelements.length; i++){
      if(elementArr.includes(subelements[i].element)){
        console.log("sub element true")
      } else elementArr.push(subelements[i].element)
    }
    return elementArr;
  },
  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByElement: ' + this.state.selectValue;
    var elementArr = this.createMetaData(dataFromDash);
    const listItems = elementArr.map((element) =>
      <option key={element} value={element} style={{margin:"2px"}}>{element}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select element</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByElement;
