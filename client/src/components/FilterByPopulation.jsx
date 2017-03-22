var React = require('react');
var array = [];

var FilterByPopulation = React.createClass({
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
    var pop = data.TargetPopulation;
    var popArr = [];
    for (var i =0; i< pop.length; i++){
      if(popArr.includes(pop[i].population)){
        //console.log("population true")
      } else popArr.push(pop[i].population)
    }
    return popArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByPopulation: ' + this.state.selectValue;
    var popArr = this.createMetadata(dataFromDash);
    const listItems = popArr.map((population) =>
      <option key={population} value={population} style={{margin:"2px"}}>{population}</option>
      );
    return(
      <div className="medium-4 columns">
        <label>Select population</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByPopulation;
