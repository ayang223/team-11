var React = require('react');
var FilterByYear = require('FilterByYear');
var FilterByFocusArea = require('FilterByFocusArea');
var FilterByCity = require('FilterByCity');
var FilterByAgency = require('FilterByAgency');
var FilterByInvested = require('FilterByInvested');
var FilterByPopulation = require('FilterByPopulation');
var FilterByElement = require('FilterByElement');
var FilterByEngagement = require('FilterByEngagement');
var ChartMoneyInvested = require('ChartMoneyInvested');
var ChartSumClientsServed = require('ChartSumClientsServed');
var ChartGeographicInvestedCityGrouping = require('ChartGeographicInvestedCityGrouping');
var TableExample = require('TableExample');
var TableProgramInfo = require('TableProgramInfo');
var D3Map = require('d3map');


class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }
  generateGraphs(){
    console.log("generate!");
    //Need to pull data from all filters, if any filter's props are undefined we need to default to get all here or the backend.. ?

  }
  componentWillMount(){
    var _this = this;
    var getData = $.ajax({
        url:"http://localhost:8080/BackendServer/DatabaseServlet",
        dataType:"json",
        type: "POST",data: JSON.stringify({
         "action" : "Get Dashboard"
       }),
        success:function(result){
          if(result.status === 'failed'){
            document.getElementById('errorOut').innerHTML = "Couldn't finish request, database returned: " + JSON.stringify(result.status);
            alert("Error Message: Something happened during the request to get data from server");
          }else{
            console.log(result);
           _this.setState({
               data: result
             })
           }
        }.bind(this),
        error:function(error){
           document.getElementById('errorOut').innerHTML = error;
           console.log(error);
        }
    });
  }
  render(){
    if(this.state.data){
      return(
        <div>
          <h2 style={{margin:"20px", textAlign: "center"}}>Dashboard Page</h2>
          <br/>
          <div className="row">
            <FilterByYear />
            <FilterByCity />
            <FilterByInvested />
            <FilterByAgency data={this.state.data}/>
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
          <div className="medium-3 columns"  style={{width: 1000, height: 1000}} >
            <ChartMoneyInvested data={this.state.data}/>
            <ChartSumClientsServed data={this.state.data}/>
            <TableProgramInfo data={this.state.data}/>
            <D3Map data={this.state.data}/>
            <ChartGeographicInvestedCityGrouping data={this.state.data}/>
          </div>
          <div className="medium-3 columns"  style={{width: 450, height: 450}} >
          </div>
        </div>
      </div>
      );
    }
    return (<div>Loading...
    <div id='errorOut'></div>
  </div>);
  }
}


module.exports = Dashboard;
