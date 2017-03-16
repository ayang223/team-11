var React = require('react');
var array = [];

var FilterByEngagement = React.createClass({
  getInitialState:function(){
    return {selectValue:[]};
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
    var donorEngagement = data.DonorEngagement;
    var engagementArr = [];
    for (var i =0; i< donorEngagement.length; i++){
      if(engagementArr.includes(donorEngagement[i].engagement)){
        console.log("engagement true")
      } else engagementArr.push(donorEngagement[i].engagement)
    }
    return engagementArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    var engagementArr = this.createMetadata(dataFromDash);
    const listItems = engagementArr.map((engagement) =>
      <option key={engagement} value={engagement} style={{margin:"2px"}}>{engagement}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select engagement</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByEngagement;
