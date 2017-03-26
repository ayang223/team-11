var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByYear = React.createClass({
  getInitialState:function(){
    return {
      value: [],
      disabled : false,
      selectValue: [],
    };
  },
  handleChange: function(value) {
    this.setState({
      value : value
    } , () => {
      var selectArr = [];
      for(var i = 0; i < this.state.value.length; i++){
        selectArr.push(JSON.stringify(this.state.value[i].value));
      }
      this.setState({
        selectValue: selectArr
      });
    });
  },
  createMetadata : function(data){
    var metadata = {};
    var year = data.AndarDataOutput;
    var yearArr = [];
    for(var i =0; i< year.length; i++){
      var object = {
          label: "",
          value: ""
      }
      object.label = year[i].grant_date.substring(0,4) + "/" +year[i].grant_end.substring(0,4);
      object.value = year[i].grant_date.substring(0,4) + "/" +year[i].grant_end.substring(0,4);
      var isDup = false;
      for(var j = 0; j < yearArr.length; j++){
        if(object.value == yearArr[j].value){
          isDup = true;
          break;
        }
      }
      if(isDup){
        //console.log("years already contained in array")
      } else {
        yearArr.push(object)
      }
    }
  //  console.log( "years: " + yearArr);
    return yearArr;
  },

  render: function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByYear: ' + this.state.selectValue;
    var yearArr = this.createMetadata(dataFromDash);
    return(
      <div>
          <label>Funding Year Filter</label>
          <Select placeholder="Select Funding Year" multi disabled={this.state.disabled} value={this.state.value} options={yearArr} onChange={this.handleChange}/>
      </div>
    )
  },
})

module.exports = FilterByYear;
