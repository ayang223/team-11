var React = require('react');

var FilterByCity = React.createClass({
  getInitialState:function(){
    return {selectedValue: 'Vancouver'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByCity: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="Vancouver">Vancouver</option>
          <option value="Richmond">Richmond</option>
          <option value="Burnaby">Burnaby</option>
          <option value="Surrey">Surrey</option>
          <option value="Delta">Delta</option>
          <option value="Langely">Langely</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByCity;
