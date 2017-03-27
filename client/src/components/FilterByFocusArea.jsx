var React = require('react');
var array = [];

var FilterByFocusArea = React.createClass({
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
    var focusarea = data.AndarDataOutput;
    var focusArr = [];
    for (var i =0; i< focusarea.length; i++){
      var isDup = false;
      var focusAreaObj = {
        "mainFocus" : "",
        "subFocus" : []
      }
      for(var k = 0; k < focusArr.length; k++){
        if(focusArr[k].mainFocus == focusarea[i].focus){
          isDup = true;
          var isSubDup = false;
          for(var j = 0; j < focusArr[k].subFocus.length; j++){

            if(focusArr[k].subFocus[j] == focusarea[i].outcome){
              isSubDup = true;
            }
          }
          if(!isSubDup){
            focusArr[k].subFocus.push(focusarea[i].outcome);
          }
        }
      }
      if(isDup){
        // don't add main Focus, check if there is a subFocus
      }else{
        focusAreaObj.mainFocus = focusarea[i].focus;
        focusAreaObj.subFocus.push(focusarea[i].outcome);

        focusArr.push(focusAreaObj);
      }
    }
    return focusArr;
  },
  subFocusChange: function(e){
    var target = e.target;
    var newSelection = JSON.stringify(target.value);
    var mainFocus = JSON.stringify(target.name);
    var array = this.state.selectValue;
    if(target.checked){
      // new selection
      for(var i = 0; i < array.length; i++){
        if(mainFocus == array[i].mainFocus){// find the parent first
          array[i].subFocus.push(newSelection); // add subElement to parent's subElementList
          this.setState({ //reset state array
            selectValue : array
          });
        }
      }
    }else{//delete selection from parent's subElementList
      for(var i = 0; i < array.length; i++){
        if(mainFocus == array[i].mainFocus){ // find parent first
          for(var j = 0; j < array[i].subFocus.length; j++){ //find subElement inside the subElement List
            if(array[i].subFocus[j] == newSelection){
              array[i].subFocus.splice(j, 1); // delete it
            }
          }
          this.setState({ // reset the state array
            selectValue : array
          });
        }
      }
    }
  },
  mainFocusChange : function(e){
    var target = e.target;
    var newSelection = JSON.stringify(target.value);
    var array = this.state.selectValue;
    var focusAreaObj = {
      "mainFocus" : "",
      "subFocus" : []
    }
    if(target.checked){ // new selection
      focusAreaObj.mainFocus = newSelection;
      array.push(focusAreaObj);
      this.setState({
        selectValue : array
      })
    }else{ // take away the selection in the state
      for(var i = 0; i < array.length; i++){
        if(array[i].mainFocus === newSelection){
          array.splice(i, 1);
        }
      }
      this.setState({
        selectValue: array
      });
    }

  },
  createListings : function(focusArr){
    var array = this.state.selectValue;
    var listFocus = [];
    for(var i = 0; i < focusArr.length; i++){
      var topSelected = false;
      for(var j = 0; j < array.length; j++){
        if(JSON.stringify(focusArr[i].mainFocus) == array[j].mainFocus){
          topSelected = true;
        }
      }
      var subFocusArr = focusArr[i].subFocus.map((subFocus)=>
      <label key={subFocus}>
        <input id={subFocus} name={focusArr[i].mainFocus}  value={subFocus} onChange={this.subFocusChange} type="checkbox" style={{marginLeft: "20px"}}></input>
        {subFocus}
          </label>
    );
    listFocus.push(
      <fieldset className="medium-6 columns" key={focusArr[i].mainFocus}>
          <label>
      <input id={focusArr[i].mainFocus}  value={focusArr[i].mainFocus} type="checkbox" style={{margin:"2px"}} onChange={this.mainFocusChange}></input>
       {focusArr[i].mainFocus}
     </label>
      {topSelected ? <div>{subFocusArr}</div> : <p></p>}
      </fieldset>
    );
    }
    return listFocus;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByFocusArea: ' + this.state.selectValue;
    var focusArr = this.createMetadata(dataFromDash);
    var listFocus = this.createListings(focusArr);

    return(
      <div className="row" style={{margin:"10px", paddingTop: "50px"}}>
        <label>Focus Area Filter </label>
            {listFocus}
      </div>
    )
  }
})

module.exports = FilterByFocusArea;
