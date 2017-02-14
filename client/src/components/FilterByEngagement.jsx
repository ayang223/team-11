var React = require('react');

var FilterByEngagement = React.createClass({
  getInitialState:function(){
    return {selectedValue: '2017'};
  },
  handleChange: function(e){
    this.setState({selectValue: e.target.value});
  },
  render:function(){
    var message = 'FilterByEngagement: ' + this.state.selectValue;
    return(
      <div className="medium-3 columns">
        <select value={this.state.selectValue} onChange={this.handleChange}>
          <option value="uw">UW Speaker</option>
          <option value="dayofcaring">Day of Caring</option>
          <option value="volunteer">Volunteer Opportunities</option>
          <option value="agencytour">Agency Tour</option>
          <option value="agencyfair">Agency Fair</option>
        </select>
        <p>{message}</p>
      </div>
    )
  }
})

module.exports = FilterByEngagement;
