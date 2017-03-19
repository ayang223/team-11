var React = require('react');
var array = [];

var FilterByYear = React.createClass({
  getInitialState:function(){
    return {
      selectValue: []};
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
    var year = data.AndarDataOutput;
    var yearArr = [];
    for(var i =0; i< year.length; i++){
      if(yearArr.includes (year[i].grant_date.substring(0,4) + "/" +year[i].grant_end.substring(0,4))){
        console.log("years already contained in array")
      } else yearArr.push(year[i].grant_date.substring(0,4) + "/" +year[i].grant_end.substring(0,4))
    }
    console.log( "years: " + yearArr);
    return yearArr;
  },

  render: function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByYear: ' + this.state.selectValue;
    var yearArr = this.createMetadata(dataFromDash);
    const listItems = yearArr.map((grant_date) =>
      <option key={grant_date} value={grant_date} style={{margin:"2px"}}>{grant_date}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select year</label>
        <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  },
})

module.exports = FilterByYear;
