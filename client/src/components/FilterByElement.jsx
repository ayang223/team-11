var React = require('react');
var array = [];

var FilterByElement = React.createClass({
    getInitialState: function() {
        return {
          selectValue: []
        };
    },
    handleChange: function(e) {
        this.setState({selectValue: array});
        var newSelection = JSON.stringify(e.target.value);
        var isPresent = false;
        var element = {
          "elementName" : "",
          "subElement": []
        }

        for (var i = 0; i < array.length; i++) {
            if (newSelection === array[i].elementName) {
                isPresent = true;
            }
        }
        if (!isPresent) {
            element.elementName = newSelection;
            array.push(element);
            console.log(this.state.selectValue);
        } else {
            var index = array.indexOf(JSON.stringify(e.target.value));
            array.splice(index, 1);
        }
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

    topLevelElementChange : function(e){
      var target = e.target;
      var newSelection = JSON.stringify(target.value);
      var array = this.state.selectValue;
      var element = {
        "elementName": "",
        "subElement":[]
      }
      if(target.checked){
        console.log("button is checked!");
        element.elementName = newSelection;
        array.push(element);
        this.setState({
          selectValue : array
        })
        console.log(this.state.selectValue);
      }else{
        console.log("button is not checked");
        for(var i = 0; i < array.length; i++){
          if(array[i].elementName === newSelection){
            array.splice(i, 1);
          }
        }
        this.setState({
          selectValue: array
        })
        console.log(this.state.selectValue);
      }

    },

    createListings: function(elementArr){
        var array = this.state.selectValue;
        var listElements = [];
        for(var i =0 ; i< elementArr.length; i++){
          var topSelected = false;
          for(var j = 0; j < array.length; j++){
            if(JSON.stringify(elementArr[i].elementName) == array[j].elementName){
              console.log(array[j].elementName);
              topSelected = true;
            }
          }
          //var message = elementArr[i].elementName + ': ' + this.state.selectValue;
          var subElementsArr = elementArr[i].subElement.map((subElement) =>
          <label key={subElement}>
            <input id={subElement}  value={elementArr[i] + subElement} onChange={this.subElementChange} type="checkbox" style={{marginLeft: "10px"}}></input>
            {subElement}
              </label>
        );
          listElements.push(
            <fieldset className="medium-6 columns" key={elementArr[i].elementName}>
              <label>Select filters for: {elementArr[i].elementName}</label>
                <label>
            <input id={elementArr[i].elementName}  value={elementArr[i].elementName} type="checkbox" style={{margin:"2px"}} onChange={this.topLevelElementChange}></input>
             {elementArr[i].elementName}
           </label>
            {topSelected ? <div>{subElementsArr}</div> : <p>Select top level</p>}
            </fieldset>
          );
        }
        return listElements;
    },

    render: function() {
        var dataFromDash = this.props.data;
        var elementArr = this.createMetadata(dataFromDash);
        console.log(elementArr);
        var listElements = this.createListings(elementArr);
        // const listItems = elementArr.map((element) =>
        //   <option key={element} value={element} style={{margin:"2px"}}>{element}</option>
        //   );
        return (
            <div>
                  {listElements}
            </div>
        )
    }
})

module.exports = FilterByElement;
