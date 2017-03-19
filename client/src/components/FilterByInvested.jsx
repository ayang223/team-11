var React = require('react');
var array = [];

var FilterByInvested = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
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
    }
  },
    createMetadata : function(data){
    var metadata = {};
    var invested = data.AndarDataOutput;
    var investedArr = [];
    var investedFilterArr = [];
    for(var i =0; i< invested.length; i++){
      investedArr.push(invested[i].yearly_allocation)
    }
    for(var i=0;i < investedArr.length; i++){
      if(investedArr[i] < 5000){
        if(investedFilterArr.includes("less than $5000")){
          console.log("less than $5000 exists")
        } else investedFilterArr.push("less than $5000");
      } else if(investedArr[i] >= 5000 && investedArr[i] <= 10000){
        if(investedFilterArr.includes("5000-$10000")){
          console.log("5000-$10000 exists")
        } else investedFilterArr.push("$5000-$10000");
      } else if (investedArr[i] >= 10000 && investedArr[i] <= 50000){
        if(investedFilterArr.includes("$10000-$50000")){
          console.log("10000-$50000 exists")
        } else investedFilterArr.push("$10000-$50000");
      } else if (investedArr[i] >= 50000 && investedArr[i] <= 100000){
        if(investedFilterArr.includes("$50000-$100000")){
          console.log("$50000-$100000 exists")
        } else investedFilterArr.push("$50000-$100000");
      }else if (investedArr[i] >= 100000 && investedArr[i] <= 250000){
        if(investedFilterArr.includes("$100000-$250000")){
          console.log("100000-$250000 exists")
        } else investedFilterArr.push("$100000-$250000");
      }else if (investedArr[i] >= 250000 && investedArr[i] <= 500000){
        if(investedFilterArr.includes("250000-$500000")){
          console.log("250000-$500000 exixts")
        } else investedFilterArr.push("$250000-$500000");
      }else if (investedArr[i] >= 500000 && investedArr[i] <= 1000000){
        if(investedFilterArr.includes("$500000-$1000000")){
          console.log("$500000-$1000000 exists")
        } else investedFilterArr.push("$500000-$1000000");
      }
    }

    console.log("filter contins: " +  investedFilterArr);
    return investedFilterArr;
  },
  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByInvested: ' + this.state.selectValue;
    var investedFilterArr = this.createMetadata(dataFromDash);
    const listItems = investedFilterArr.map((yearly_allocation) =>
      <option key={yearly_allocation} value={yearly_allocation} style={{margin:"2px"}}>{yearly_allocation}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select Invested</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByInvested;
