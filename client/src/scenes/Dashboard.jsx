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
        this.generateGraphs = this.generateGraphs.bind(this);
        this.state = {
            data: null,
            filterData: null
        };
    }
    generateGraphs() {
        console.log("generate!");
        var filteredData = this.state.data;
        
        var filterByYear = this._filterByYear.state.selectValue;
        var filterByCity = this._filterByCity.state.selectValue;
        var filterByInvested = this._filterByInvested.state.selectValue;
        var filterByAgency = this._filterByInvested.state.selectValue;
        var filterByFocusArea = this._filterByFocusArea.state.selectValue;
        var filterByPopulation = this._filterByPopulation.state.selectValue;
        var filterByElement = this._filterByElement.state.selectValue;
        var filterByEngagement = this._filterByEngagement.state.selectValue;

        // Take stuff out of filtered data based on filters
        // Example if delete all
        filteredData = {
          Program: [],
          Location: [],
          Agency: [],
          AndarDataOutput: [],
          TargetPopulation: [],
          ProgramElement: [],
          ProgramSubElement: [],
          GeoArea: [],
          Municipality: [],
          AreaDirectory: [],
          DonorEngagement: [],
          Outputs: []
        };
        this.state.filterData = filteredData;

        this._chartMoneyInvested.setState({data: filteredData});
    }

    exportPDF() {
        console.log("export!");
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
                        <FilterByYear ref={filterbyyear => { this._filterByYear = filterbyyear}}/>
                        <FilterByCity ref={filterbycity => { this._filterByCity = filterbycity}} data={this.state.data}/>
                        <FilterByInvested ref={filterbyinvested => { this._filterByInvested = filterbyinvested}}/>
                        <FilterByAgency ref={filterbyagency => { this._filterByAgency = filterbyagency}} data={this.state.data}/>
                    </div>
                    <br/>
                    <div className="row">
                        <FilterByFocusArea ref={filterbyfocusarea => { this._filterByFocusArea = filterbyfocusarea }} data={this.state.data} />
                        <FilterByPopulation ref={filterbypopulation => { this._filterByPopulation = filterbypopulation }} data={this.state.data}/>
                        <FilterByElement ref={filterbyelement => { this._filterByElement = filterbyelement}} data={this.state.data}/>
                        <FilterByEngagement ref={filterbyengagement => { this._filterByEngagement = filterbyengagement}} data={this.state.data}/>
                        <button className="button info" onClick={this.generateGraphs} style={{
                            margin: "20px"
                        }}>Generate</button>
                        <button className="button export" onClick={this.exportPDF} style={{
                            margin: "20px"
                        }}>Export PDF</button>
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
                                <ChartMoneyInvested ref={chartmoneyinvested => { this._chartMoneyInvested = chartmoneyinvested}} data={this.state.filterData}/>
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
