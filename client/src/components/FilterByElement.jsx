var React = require('react');
var array = [];

var FilterByElement = React.createClass({
    getInitialState: function() {
        return {
          selectValue: []
        };
    },

    createMetadata: function(data) {
        var metadata = {};
        var elements = data.ProgramElement;
        var elements2 = data.ProgramSubElement; // element in programsubelements
        var elementArr = [];
        for (var i = 0; i < elements.length; i++) {
            var isDup = false;
            var element = {
                "elementName": "",
                "subElement": []
            }
            if (i > 0) {
                for (var k = 0; k < elementArr.length; k++) {
                    if (elementArr[k].elementName === elements[i].element) {
                        isDup = true;
                    }
                }
            }
            if (isDup) {
                //don't add new element, already there
            } else {
                element.elementName = elements[i].element;
                var subElementArray = [];
                for (var j = 0; j < elements2.length; j++) {
                    if (elements[i].element === elements2[j].element) {
                      if(!subElementArray.includes(elements2[j].subElement)){
                        subElementArray.push(elements2[j].subElement);
                      }
                    }
                }
                element.subElement = subElementArray;
                elementArr.push(element);

            }
        }
        return elementArr;
    },

    subElementChange: function(e){
      var target = e.target;
      var newSelection = JSON.stringify(target.value);
      var parentElement = JSON.stringify(target.name);
      var array = this.state.selectValue;
      if(target.checked){
        // new selection
        for(var i = 0; i < array.length; i++){
          if(parentElement == array[i].elementName){// find the parent first
            array[i].subElement.push(newSelection); // add subElement to parent's subElementList
            this.setState({ //reset state array
              selectValue : array
            });
          }
        }
      }else{//delete selection from parent's subElementList
        for(var i = 0; i < array.length; i++){
          if(parentElement == array[i].elementName){ // find parent first
            for(var j = 0; j < array[i].subElement[j]; j++){ //find subElement inside the subElement List
              if(array[i].subElement[j] == newSelection){
                array[i].subElement.splice(j, 1); // delete it
              }
            }
            this.setState({ // reset the state array
              selectValue : array
            });
          }
        }
      }
    },

    topLevelElementChange : function(e){
      var target = e.target;
      var newSelection = JSON.stringify(target.value);
      var array = this.state.selectValue;
      var element = {
        "elementName": "",
        "subElement":[]
      }
      if(target.checked){ // new selection
        element.elementName = newSelection;
        array.push(element);
        this.setState({
          selectValue : array
        })
      }else{ // take away the selection in the state
        for(var i = 0; i < array.length; i++){
          if(array[i].elementName === newSelection){
            array.splice(i, 1);
          }
        }
        this.setState({
          selectValue: array
        });
      }

    },

    createListings: function(elementArr){
        var array = this.state.selectValue;
        var listElements = [];
        for(var i =0 ; i< elementArr.length; i++){
          var topSelected = false;
          for(var j = 0; j < array.length; j++){
            if(JSON.stringify(elementArr[i].elementName) == array[j].elementName){
                topSelected = true;
            }
          }
          //var message = elementArr[i].elementName + ': ' + this.state.selectValue;
          var subElementsArr = elementArr[i].subElement.map((subElement) =>
          <label key={subElement}>
            <input id={subElement} name={elementArr[i].elementName}  value={subElement} onChange={this.subElementChange} type="checkbox" style={{marginLeft: "20px"}}></input>
            {subElement}
              </label>
        );
          listElements.push(
            <fieldset className="medium-6 columns" key={elementArr[i].elementName}>
                <label>
            <input id={elementArr[i].elementName}  value={elementArr[i].elementName} type="checkbox" style={{margin:"2px"}} onChange={this.topLevelElementChange}></input>
             {elementArr[i].elementName}
           </label>
            {topSelected ? <div>{subElementsArr}</div> : <p></p>}
            </fieldset>
          );
        }
        return listElements;
    },

    render: function() {
        var dataFromDash = this.props.data;
        var elementArr = this.createMetadata(dataFromDash);
        var listElements = this.createListings(elementArr);
        return (
            <div className="row" style={{margin:"10px", paddingTop: "50px"}}>
              <label>Select Filters for Program Element:</label>
                  {listElements}
            </div>
        )
    }
})

module.exports = FilterByElement;
