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
var Listing = require('Listing');
var url = require('url');
var ReactTabs = require('react-tabs'),
    Tab = ReactTabs.Tab,
    Tabs = ReactTabs.Tabs,
    TabList = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            filterData: null
        }
    }
    generateGraphs() {
        console.log("generate!");
        //Need to pull data from all filters, if any filter's props are undefined we need to default to get all here or the backend.. ?

    }
    componentWillMount() {
        var _this = this;
        var getData = $.ajax({
            url: url,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({"action": "Get Dashboard"}),
            success: function(result) {
                if (result.status === 'failed') {
                    document.getElementById('errorOut').innerHTML = "Couldn't finish request, database returned: " + JSON.stringify(result.status);
                    alert("Error Message: Something happened during the request to get data from server");
                } else {
                    console.log(result);
                    _this.setState({data: result, filterData: result})
                }
            }.bind(this),
            error: function(error) {
                document.getElementById('errorOut').innerHTML = error;
                console.log(error);
            }
        });
    }
    render() {
        if (this.state.data) {
            return (
                <div>
                    <h2 style={{
                        margin: "20px",
                        textAlign: "center"
                    }}>Dashboard Page</h2>
                    <br/>
                    <div className="row">
                        <FilterByYear/>
                        <FilterByCity data={this.state.data}/>
                        <FilterByInvested/>
                        <FilterByAgency data={this.state.data}/>
                    </div>
                    <br/>
                    <div className="row">
                        <FilterByFocusArea data={this.state.data}/>
                        <FilterByPopulation data={this.state.data}/>
                        <FilterByElement data={this.state.data}/>
                        <FilterByEngagement data={this.state.data}/>
                        <button className="button info" onClick={this.generateGraphs} style={{
                            margin: "20px"
                        }}>Generate</button>
                    </div>
                    <br/>
                    <div>
                        <Tabs>
                            <TabList>
                                <Tab>Money Invested</Tab>
                                <Tab>Clients Served</Tab>
                                <Tab>Geographic Distribution</Tab>
                            </TabList>
                            <TabPanel>
                                <ChartMoneyInvested data={this.state.filterData}/>
                            </TabPanel>
                            <TabPanel>
                                <ChartSumClientsServed data={this.state.filterData}/>
                            </TabPanel>
                            <TabPanel>
                                <ChartGeographicInvestedCityGrouping data={this.state.filterData}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div >
											<D3Map data={this.state.filterData}/>
                    </div>
										<Tabs>
												<TabList>
														<Tab>Table of Totals</Tab>
														<Tab>Listings</Tab>
												</TabList>
												<TabPanel>
														<TableProgramInfo data={this.state.filterData}/>
												</TabPanel>
												<TabPanel>
                            <Listing data={this.state.filterData}/>
												</TabPanel>
										</Tabs>
                </div>
            );
        }
        return (
            <div>Loading...
                <div id='errorOut'></div>
            </div>
        );
    }
}

module.exports = Dashboard;
