var React = require('react');

var FilterByYear = React.createClass({
  getInitialState:function(){
    return {selectedValue: '2017'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByYear: ' + this.state.selectValue;
    return(
      <div className="dropdown menu">
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByYear;
