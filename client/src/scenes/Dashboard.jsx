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
var $ = require('jQuery');
var loadingImg = require('public/pie.svg');
var ReactTabs = require('react-tabs'),
    Tab = ReactTabs.Tab,
    Tabs = ReactTabs.Tabs,
    TabList = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.generateGraphs = this.generateGraphs.bind(this);
        this.filterOutID = this.filterOutID.bind(this);
        this.contains = this.contains.bind(this);
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
        var filterByAgency = this._filterByAgency.state.selectValue;
        var filterByFocusArea = this._filterByFocusArea.state.selectValue;
        var filterByPopulation = this._filterByPopulation.state.selectValue;
        var filterByEngagement = this._filterByEngagement.state.selectValue;
        var filterByElement = this._filterByElement.state.selectValue;
        console.log(filterByCity);
        console.log(filterByFocusArea);
        //console.log(filterByAgency);
        // Take stuff out for Year

        // Take stuff out for City
        var filterByCityOn = true;
        var filterByCityIDs = [];
        for (var i = 0; i < filteredData.Municipality.length; i++) {
            if (!$.isArray(filterByCity) || filterByCity.length == 0) {
                filterByCityOn = false;
                break;
            } else {
                var isFiltered = false;
                for(var j = 0; j < filterByCity.length; j++) {
                    if (JSON.stringify(filteredData.Municipality[i].municipality) == filterByCity[j]) {
                        isFiltered = true;
                        break;
                    }
                }
                if (isFiltered) {
                    filterByCityIDs.push(filteredData.Municipality[i].andar_id);
                }
            }
        }
        if (filterByCityOn) {
            filteredData = this.filterOutID(filteredData, filterByCityIDs);
        }

        // Take stuff out for Invested

        // Take stuff out for Agency (Should only affect it's own table)

        // Take stuff out for Focus Area

        // Take stuff out for Population

        // Take stuff out for Engagement

        // Take stuff out for Element/SubElement

        console.log(filteredData);

        this.setState({filterData: filteredData});

        this._chartMoneyInvested.setState({data: filteredData});
     	this._chartSumClientsServed.setState({data: filteredData});
        this._chartGeographicInvestedCityGrouping.setState({data: filteredData});

        this._map.setState({data: filteredData});
        this._tableProgramInfo.setState({data: filteredData});
		this._listing.setState({data: filteredData});
    }

    filterOutID(data, filterIDs) {
        var filteredData = JSON.parse(JSON.stringify(data));

        // Filter Program
        for(var i = 0; i < data.Program.length; i++) {
            var programID = data.Program[i].id;
            if (!this.contains(filterIDs, programID)) {
                var programObject = JSON.stringify(data.Program[i]);
                var programIndex = -1;
                for(var j = 0; j < filteredData.Program.length; j++) {
                    if(JSON.stringify(filteredData.Program[j]) == programObject) {
                        programIndex = j;
                        break;
                    }
                }
                if (programIndex > -1) {
                    filteredData.Program.splice(programIndex, 1);
                }
            }
        }

        // Filter Location
        for(var i = 0; i < data.Location.length; i++) {
            var locationAndarID = data.Location[i].andar_id;
            if (!this.contains(filterIDs, locationAndarID)) {
                var locationObject = JSON.stringify(data.Location[i])
                var locationIndex = -1;
                for(var j = 0; j < filteredData.Location.length; j++) {
                    if(JSON.stringify(filteredData.Location[j]) == locationObject) {
                        locationIndex = j;
                        break;
                    }
                }
                if  (locationIndex > -1) {
                    filteredData.Location.splice(locationIndex, 1);
                }
            }
        }

        // Filter out Andar Data Output
        for(var i = 0; i < data.AndarDataOutput.length; i++) {
            var andarOutputID = data.AndarDataOutput[i].program_andar;
            if (!this.contains(filterIDs, andarOutputID)) {
                var andarOutputObject = JSON.stringify(data.AndarDataOutput[i])
                var andarOutputIndex = -1;
                for(var j = 0; j < filteredData.AndarDataOutput.length; j++) {
                    if(JSON.stringify(filteredData.AndarDataOutput[j]) == andarOutputObject) {
                        andarOutputIndex = j;
                        break;
                    }
                }
                if  (andarOutputIndex > -1) {
                    filteredData.AndarDataOutput.splice(andarOutputIndex, 1);
                }
            }
        }

        // Filter out Target Population
        for(var i = 0; i < data.TargetPopulation.length; i++) {
            var targetPopulationID = data.TargetPopulation[i].andar_id;
            if (!this.contains(filterIDs, targetPopulationID)) {
                var targetPopulationObject = JSON.stringify(data.TargetPopulation[i])
                var targetPopulationIndex = -1;
                for(var j = 0; j < filteredData.TargetPopulation.length; j++) {
                    if(JSON.stringify(filteredData.TargetPopulation[j]) == targetPopulationObject) {
                        targetPopulationIndex = j;
                        break;
                    }
                }
                if  (targetPopulationIndex > -1) {
                    filteredData.TargetPopulation.splice(targetPopulationIndex, 1);
                }
            }
        }

        // Filter out Program Element
        for(var i = 0; i < data.ProgramElement.length; i++) {
            var programElementID = data.ProgramElement[i].andar_id
            if (!this.contains(filterIDs, programElementID)) {
                var programElementObject = JSON.stringify(data.ProgramElement[i])
                var programElementIndex = -1;
                for(var j = 0; j < filteredData.ProgramElement.length; j++) {
                    if(JSON.stringify(filteredData.ProgramElement[j]) == programElementObject) {
                        programElementIndex = j;
                        break;
                    }
                }
                if  (programElementIndex > -1) {
                    filteredData.ProgramElement.splice(programElementIndex, 1);
                }
            }
        }

        // Filter out Program Sub Element
        for(var i = 0; i < data.ProgramSubElement.length; i++) {
            var programSubElementID = data.ProgramSubElement[i].andar_id
            if (!this.contains(filterIDs, programSubElementID)) {
                var programSubElementObject = JSON.stringify(data.ProgramSubElement[i])
                var programSubElementIndex = -1;
                for(var j = 0; j < filteredData.ProgramSubElement.length; j++) {
                    if(JSON.stringify(filteredData.ProgramSubElement[j]) == programSubElementObject) {
                        programSubElementIndex = j;
                        break;
                    }
                }
                if  (programSubElementIndex > -1) {
                    filteredData.ProgramSubElement.splice(programSubElementIndex, 1);
                }
            }
        }

        // Filter out Geo Area
        for(var i = 0; i < data.GeoArea.length; i++) {
            var geoAreaID = data.GeoArea[i].andar_id
            if (!this.contains(filterIDs, geoAreaID)) {
                var geoAreaObject = JSON.stringify(data.GeoArea[i])
                var geoAreaIndex = -1;
                for(var j = 0; j < filteredData.GeoArea.length; j++) {
                    if(JSON.stringify(filteredData.GeoArea[j]) == geoAreaObject) {
                        geoAreaIndex = j;
                        break;
                    }
                }
                if  (geoAreaIndex > -1) {
                    filteredData.GeoArea.splice(geoAreaIndex, 1);
                }
            }
        }

        // Filter out Municipality
        for(var i = 0; i < data.Municipality.length; i++) {
            var municipalityID = data.Municipality[i].andar_id
            if (!this.contains(filterIDs, municipalityID)) {
                var municipalityObject = JSON.stringify(data.Municipality[i])
                var municipalityIndex = -1;
                for(var j = 0; j < filteredData.Municipality.length; j++) {
                    if(JSON.stringify(filteredData.Municipality[j]) == municipalityObject) {
                        municipalityIndex = j;
                        break;
                    }
                }
                if  (municipalityIndex > -1) {
                    filteredData.Municipality.splice(municipalityIndex, 1);
                }
            }
        }

        // Filter out Donor Engagement
        for(var i = 0; i < data.DonorEngagement.length; i++) {
            var donorEngagementID = data.DonorEngagement[i].andar_id
            if (!this.contains(filterIDs, donorEngagementID)) {
                var donorEngagementObject = JSON.stringify(data.DonorEngagement[i])
                var donorEngagementIndex = -1;
                for(var j = 0; j < filteredData.DonorEngagement.length; j++) {
                    if(JSON.stringify(filteredData.DonorEngagement[j]) == donorEngagementObject) {
                        donorEngagementIndex = j;
                        break;
                    }
                }
                if  (donorEngagementIndex > -1) {
                    filteredData.DonorEngagement.splice(donorEngagementIndex, 1);
                }
            }
        }

        // Filter out Output
        for(var i = 0; i < data.Outputs.length; i++) {
            var outputID = data.Outputs[i].andar_id
            if (!this.contains(filterIDs, outputID)) {
                var outputObject = JSON.stringify(data.Outputs[i])
                var outputIndex = -1;
                for(var j = 0; j < filteredData.Outputs.length; j++) {
                    if(JSON.stringify(filteredData.Outputs[j]) == outputObject) {
                        outputIndex = j;
                        break;
                    }
                }
                if  (outputIndex > -1) {
                    filteredData.Outputs.splice(outputIndex, 1);
                }
            }
        }

        return filteredData;
    }

    contains(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
        return false;
    }

    exportPDF() {
        console.log("export!");
				window.print();
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
                        <FilterByYear ref={filterbyyear => { this._filterByYear = filterbyyear}} data={this.state.data}/>

                        <FilterByInvested ref={filterbyinvested => { this._filterByInvested = filterbyinvested}} data={this.state.data}/>

                    </div>
                    <div className="row">
                        <FilterByCity ref={filterbycity => { this._filterByCity = filterbycity}} data={this.state.data}/>
                        <FilterByAgency ref={filterbyagency => { this._filterByAgency = filterbyagency}} data={this.state.data}/>
                        <FilterByPopulation ref={filterbypopulation => { this._filterByPopulation = filterbypopulation }} data={this.state.data}/>
                   </div>
                    <br/>
                    <div className="row">
                        <FilterByFocusArea ref={filterbyfocusarea => { this._filterByFocusArea = filterbyfocusarea }} data={this.state.data} />

                        <FilterByEngagement ref={filterbyengagement => { this._filterByEngagement = filterbyengagement}} data={this.state.data}/>

                    </div>
										<div className="row">
											<FilterByElement ref={filterbyelement => { this._filterByElement = filterbyelement}} data={this.state.data}/>
										</div>
										<div className="row">
											<button className="button info" onClick={this.generateGraphs} style={{
													margin: "20px"
											}}>Generate</button>
											<button className="button export" onClick={this.exportPDF} style={{
													margin: "20px"
											}}>Export PDF</button></div>
                    <br/>
                    <div>
                        <Tabs forceRenderTabPanel={true}>
                            <TabList>
                                <Tab>Money Invested</Tab>
                                <Tab>Clients Served</Tab>
                                <Tab>Geographic Distribution</Tab>
                            </TabList>
                            <TabPanel>
                                <ChartMoneyInvested ref={chartmoneyinvested => { this._chartMoneyInvested = chartmoneyinvested}} data={this.state.filterData}/>
                            </TabPanel>
                            <TabPanel>
                                <ChartSumClientsServed ref={chartsumclientsserved => { this._chartSumClientsServed = chartsumclientsserved}} data={this.state.filterData}/>
                            </TabPanel >
                            <TabPanel>
                                <ChartGeographicInvestedCityGrouping ref={chartgeographicinvestedcitygrouping => { this._chartGeographicInvestedCityGrouping = chartgeographicinvestedcitygrouping}} data={this.state.filterData}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div >
											<D3Map ref={map => { this._map = map}} data={this.state.filterData}/>
                    </div>
                    <div className="row" style={{marginTop: "50px"}}>
                    </div>
										<Tabs forceRenderTabPanel={true}>
												<TabList>
														<Tab>Table of Totals</Tab>
														<Tab>Listings</Tab>
												</TabList>
												<TabPanel>
														<TableProgramInfo ref={tableprograminfo => { this._tableProgramInfo = tableprograminfo }} data={this.state.filterData}/>
												</TabPanel>
												<TabPanel>
                            <Listing ref={listing => { this._listing = listing }} data={this.state.filterData}/>
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
