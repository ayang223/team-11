var React = require('react');
var FilterByYear = require('FilterByYear');
var FilterByFocusArea = require('FilterByFocusArea');
var FilterByCity = require('FilterByCity');
var FilterByAgency = require('FilterByAgency');
var FilterByInvested = require('FilterByInvested');

var Dashboard = React.createClass({
  render: function(){
    return(
      <div>
        <h2>Dashboard Page</h2>
        <div className="top-bar" style={{flexDirection: 'row'}}>
          <FilterByYear />
          <FilterByFocusArea />
          <FilterByCity />
          <FilterByAgency />
          <FilterByInvested />
        </div>
      </div>
    )
  }
})

module.exports = Dashboard;
