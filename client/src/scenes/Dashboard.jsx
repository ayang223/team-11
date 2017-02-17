var React = require('react');
var FilterByYear = require('FilterByYear');
var FilterByFocusArea = require('FilterByFocusArea');
var FilterByCity = require('FilterByCity');
var FilterByAgency = require('FilterByAgency');
var FilterByInvested = require('FilterByInvested');
var ChartDollarsCity = require('ChartDollarsCity');
var d3map = require('d3map');


var Dashboard = React.createClass({
  render: function(){
    return(
      <div>
        <h2 style={{textAlign:"left"}}>Dashboard Page</h2>
        <br/><br/>
        <div className="row">
          <FilterByYear />
          <FilterByFocusArea />
          <FilterByCity />
          <FilterByAgency />
          <FilterByInvested />
          <ChartDollarsCity />
          <d3map />
        </div>
      </div>
    )
  }
})

module.exports = Dashboard;
