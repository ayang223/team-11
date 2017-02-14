var React = require('react');

var FilterByPopulation = React.createClass({
  getInitialState:function(){
    return {selectedValue: 'other'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByPopulation: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="earlychildhood">Early Childhood</option>
          <option value="middleyears">Middle Years</option>
          <option value="families">Families</option>
          <option value="seniors">Seniors</option>
          <option value="parents/caregicers">Parents/Caregicers</option>
          <option value="youth">Youth</option>
          <option value="immigrants">Immigrants/Refugees</option>
          <option value="women">Woman</option>
          <option value="aboriginal/firstnations">Aboriginal/First Nations</option>
          <option value="other">Other</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByPopulation;
