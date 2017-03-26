var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByEngagement = React.createClass({
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
    var donorEngagement = data.DonorEngagement;
    var engagementArr = [];
    for (var i =0; i< donorEngagement.length; i++){
      var object = {
        label : "",
        value: ""
      }
      object.label = donorEngagement[i].engagement;
      object.value = donorEngagement[i].engagement;
      var isDup = false;
      for(var j = 0; j < engagementArr.length; j++){
        if(object.value == engagementArr[j].value){
          isDup = true;
          break;
        }
      }
      if(isDup){
        //console.log("engagement true")
      } else engagementArr.push(object)
    }
    return engagementArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    var engagementArr = this.createMetadata(dataFromDash);
    return(
      <div>
          <label>Engagement Filter</label>
          <Select placeholder="Select Engagment" multi disabled={this.state.disabled} value={this.state.value} options={engagementArr} onChange={this.handleChange}/>
      </div>
    )
  }
})

module.exports = FilterByEngagement;
