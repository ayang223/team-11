var React = require('react');
var FilterByYear = require('FilterByYear');
var FilterByFocusArea = require('FilterByFocusArea');
var FilterByCity = require('FilterByCity');
var FilterByAgency = require('FilterByAgency');
var FilterByInvested = require('FilterByInvested');
var FilterByPopulation = require('FilterByPopulation');
var FilterByElement = require('FilterByElement');
var FilterByEngagement = require('FilterByEngagement');
var ChartDollarsCity = require('ChartDollarsCity');

var Dashboard = React.createClass({
  render: function(){
    return(
      <div>
        <h2 style={{textAlign:"left"}}>Dashboard Page</h2>
        <br/>
        <div className="row">
          <FilterByYear />
          <FilterByCity />
          <FilterByInvested />
          <FilterByAgency />
        </div>
        <div className="row">
            <FilterByFocusArea />
            <FilterByPopulation />
            <FilterByElement />
            <FilterByEngagement />
        </div>
        <div className="panel"  style={{width: 450, height: 450}} >
          <ChartDollarsCity />
        </div>
      </div>
    )
  }
})

module.exports = Dashboard;
