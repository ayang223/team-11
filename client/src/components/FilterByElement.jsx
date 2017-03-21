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
                    if (elements[i].andar_id === elements2[j].andar_id) {
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

    createListings: function(elementArr){

        var listElements = [];
        var ifTopSelected = false;
        for(var i =0 ; i< elementArr.length; i++){
          var message = elementArr[i].elementName + ': ' + this.state.selectValue;
          var subElementsArr = elementArr[i].subElement.map((subElement) =>
          <label for={subElement} key={subElement}>{subElement}
            <input id={subElement}  value={subElement} onChange={this.handleChange} type="checkbox" style={{marginLeft: "10px"}}></input>
              </label>
        );
          listElements.push(
            <fieldset className="medium-6 columns" key={elementArr[i].elementName}>
              <label>Select filters for: {elementArr[i].elementName}</label>
                <label for={elementArr[i].elementName}> {elementArr[i].elementName}
            <input id={elementArr[i].elementName}  value={elementArr[i].elementName} type="checkbox"  style={{margin:"2px"}} onChange={this.handleChange}></input>
             </label>
            {ifTopSelected ?   <div>{subElementsArr}</div> : <div></div>}
              <label>{message}</label>
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
