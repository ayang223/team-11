var React = require('react');

var FilterByYear = React.createClass({
  getInitialState:function(){
    return {selectValue: '(nothing selected)'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByYear: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <label>Select year</label>
        <select multiple="multiple" size="3" value={this.state.selectValue} onChange={this.handleChange}>
          <option value="2017/18">2017/18</option>
          <option value="2016/17">2016/17</option>
          <option value="2015/16">2015/16</option>
        </select>
        <label>{message}</label>
      </div>
    )
  }
})

module.exports = FilterByYear;
