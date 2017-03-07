var React = require('react');

var FilterByPopulation = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByPopulation: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select population</label>
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="Early Childhood">Early Childhood</option>
          <option value="Middle Years">Middle Years</option>
          <option value="Families">Families</option>
          <option value="Seniors">Seniors</option>
          <option value="Parents/Caregicers">Parents/Caregicers</option>
          <option value="Youth">Youth</option>
          <option value="Immigrants/Refugees">Immigrants/Refugees</option>
          <option value="Woman">Woman</option>
          <option value="Aboriginal/First Nations">Aboriginal/First Nations</option>
          <option value="Other">Other</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByPopulation;
