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
  generateGraphs(){
    console.log("generate!");
  }
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
            <button className="button info" onClick={this.generateGraphs}>Generate</button>
        </div>
        <br/>
        <div className="row">
        <div className="medium-3 columns"  style={{width: 450, height: 450}} >
          <ChartDollarsCity />
          </div>
          <div className="medium-3 columns"  style={{width: 450, height: 450}} >
              <D3Map />
            </div>
            </div>
      </div>
    )
  }
}


module.exports = Dashboard;
