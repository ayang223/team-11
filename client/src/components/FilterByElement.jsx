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
    var elements = data.ProgramElement;
    var elements2 = data.ProgramSubElement; // element in programsubelements
    var elementArr = [];
    for(var i = 0; i< elements.length; i++ ){
      if(elementArr.includes(elements[i].element)){
        console.log("element true")
      }else elementArr.push(elements[i].element)
    }
    for(var i = 0; i< elements2.length; i++){
      if(elementArr.includes(elements2[i].element)){
        console.log("element2 true")
      } else elementArr.push(elements2[i].element)
    }
    return elementArr;
  },

  createMetadata2:function(data){
    var metadata = {};
    var subelements = data.ProgramSubElement; //subelements in programsubelements
    var subEleArr = [];
    for (var i = 0; i < subelements.length; i++){
      if(subEleArr.includes(subelements[i].subElement)){
        console.log("sub element true")
      } else subEleArr.push(subelements[i].subElement)
    }
    return subEleArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByElement: ' + this.state.selectValue;
    var elementArr = this.createMetadata(dataFromDash);
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
