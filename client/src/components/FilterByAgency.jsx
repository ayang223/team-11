var React = require('react');
var array = [];

var FilterByAgency = React.createClass({
  getInitialState:function(){
    return {selectValue: [] };
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
  createMetadata : function(data){
    var metadata = {};
    var agency = data.Agency;
    var agencyNames = [];
    for(var i =0; i< agency.length; i++){
      agencyNames.push(agency[i].name)
    }
    return agencyNames;
  },
  render:function(){
    var dataFromDash = this.props.data;
    var message = 'Filter Agencies: ' + this.state.selectValue;
    var agencyNames = this.createMetadata(dataFromDash);
    const listItems = agencyNames.map((name) =>
          <option key={name} value={name} style={{margin:"2px"}}>{name}</option>
        );
    return(
      <div className="medium-3 columns">
        <label>Select Agency</label>
      <select multiple={true} size="3" value={this.state.selectValue} onChange={this.handleChange}>
          {listItems}
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByAgency;
