var React = require('react');
var array = [];
var Select = require('react-select');
var activeItem =  {
  color: 'Black', fontWeight: 'bold'
}
var FilterByAgency = React.createClass({
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
    });
    var selectArr = [];
    for(var i = 0; i < this.state.value.length; i++){
      selectArr.push(this.state.value[i].value);
    }
    this.setState({
      selectValue: selectArr
    })
    console.log(this.state.selectValue);
    console.log(this.state.value);
  },
  createMetadata : function(data){
    var metadata = {};
    var agency = data.Agency;
    var agencyNames = [];
    for(var i =0; i< agency.length; i++){
      var object = {
        label : "",
        value: ""
      }
      object.label = agency[i].name;
      object.value = agency[i].name;
      agencyNames.push(object);
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
        <div>
          <label>Select Agency</label>
          <Select multi disabled={this.state.disabled} value={this.state.value} options={agencyNames} onChange={this.handleChange}  />
          </div>
    )
  }
})

module.exports = FilterByAgency;
// <div className="medium-3 columns">
//   <label>Select Agency</label>
// <select multiple={true} size="3" value={this.state.selectValue} onChange={this.handleChange}>
//     {listItems}
//   </select>
//   <label>{message}</label>
// </div>
