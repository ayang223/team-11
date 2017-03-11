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
var D3Map = require('d3map');


class Dashboard extends React.Component{
  render(){
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
        <br/>
        <div className="row">
            <FilterByFocusArea />
            <FilterByPopulation />
            <FilterByElement />
            <FilterByEngagement />
        </div>
        <br/>
        <div className="panel"  style={{width: 450, height: 450}} >
          <ChartDollarsCity />
          <D3Map />
        </div>
      </div>
    )
  }
}


module.exports = Dashboard;
