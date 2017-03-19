var React = require('react');
var array = [];

var FilterByElement = React.createClass({
  getInitialState:function(){
    return {selectValue: []};
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
    }else{
      var index = array.indexOf(JSON.stringify(e.target.value));
      array.splice(index, 1);
    }
  },

  createMetadata:function(data){
    var metadata = {};
    var elementsMain = data.ProgramElement;
    var elementSub = data.ProgramSubElement; // element in programsubelements
    var elementMainArr = [];
    var elementSubArr = [];
    for(var i = 0; i< elementsMain.length; i++ ){ // gets main element from program elements put into array elementMainArr
      if(elementMainArr.includes(elementsMain[i].element)){
        console.log("element true")
      }else elementMainArr.push(elementsMain[i].element)
    }

    for(var i = 0; i < elementSub.length; i++){ // gets main and sub elelemtn from programsubelement
      elementSubArr.push("Main element: " + elementSub[i].element + " Sub element: " + elementSub[i].subElement)
    }
    
    console.log(elementSubArr);
    return elementMainArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByElement: ' + this.state.selectValue;
    var elementMainArr = this.createMetadata(dataFromDash);
    const listItems = elementMainArr.map((element) =>
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
