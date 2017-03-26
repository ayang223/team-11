var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByCity = React.createClass({
  getInitialState:function(){
    return {
      value: [],
      disabled : false,
      selectValue: [],
    };
  },
  handleChange: function(value){
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

  createMetadata:function(data){
    var metadata = {};
    var city = data.Municipality;
    var cityArr = [];
    for (var i =0; i< city.length; i++){
      var object = {
        label : "",
        value: ""
      }
      object.label = city[i].municipality;
      object.value = city[i].municipality;
      var isDup = false;
      for(var j = 0; j < cityArr.length; j++){
        if(object.value == cityArr[j].municipality){
          isDup = true;
          break;
        }
      }
      if(isDup){
        //console.log("population true")
      } else {
        cityArr.push(object)
      }
    }
    return cityArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByCity: ' + this.state.selectValue;
    var cityArr = this.createMetadata(dataFromDash);

    return(
      <div>
        <label>City Groupings Filter</label>
        <Select placeholder="Select City" multi disabled={this.state.disabled} value={this.state.value} options={cityArr} onChange={this.handleChange}  />
        </div>
    )
  }
})

module.exports = FilterByCity;
