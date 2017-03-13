var React = require('react');
var array = [];

var FilterByCity = React.createClass({
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

  createMetaData:function(data){
    var metadata = {};
    var city = data.Municipality;
    var cityArr = []; 
    for (var i =0; i< city.length; i++){
      if(cityArr.includes(city[i].municipality)){
        console.log("population true")
      } else cityArr.push(city[i].municipality)
    }
    return cityArr;
  },

  render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByCity: ' + this.state.selectValue;
    var cityArr = this.createMetaData(dataFromDash);
    const listItems = cityArr.map((municipality) =>
      <option key={municipality} value={municipality} style={{margin:"2px"}}>{municipality}</option>
      );
    return(
      <div className="medium-3 columns">
        <label>Select city</label>
      <select multiple={{true}} size="3" value={[]} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByCity;
