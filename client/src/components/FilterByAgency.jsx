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
          <label>Agency Filter</label>
          <Select placeholder="Select Agency" multi disabled={this.state.disabled} value={this.state.value} options={agencyNames} onChange={this.handleChange}  />
          </div>
    )
  }
})

module.exports = FilterByAgency;
