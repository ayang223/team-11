import cookie from 'react-cookie';
var React = require('react');
var FilterByYear = require('FilterByYear');
var FilterByFocusArea = require('FilterByFocusArea');
var FilterByCity = require('FilterByCity');
var FilterByAgency = require('FilterByAgency');
var FilterByInvested = require('FilterByInvested');
var FilterByPopulation = require('FilterByPopulation');
var FilterByElement = require('FilterByElement');
var FilterByEngagement = require('FilterByEngagement');
var FilterByGeoArea = require('FilterByGeoArea');
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
        var filteredData = this.state.data;

        var filterByYear = this._filterByYear.state.selectValue;
        var filterByCity = this._filterByCity.state.selectValue;
        var filterByInvested = this._filterByInvested.state.selectValue;
        var filterByAgency = this._filterByAgency.state.selectValue;
        var filterByFocusArea = this._filterByFocusArea.state.selectValue;
        var filterByPopulation = this._filterByPopulation.state.selectValue;
        var filterByEngagement = this._filterByEngagement.state.selectValue;
        var filterByElement = this._filterByElement.state.selectValue;
        var filterByGeoArea = this._filterByGeoArea.state.selectValue;

        var username = cookie.load('userID');
        var allFilters = filterByYear.concat(filterByCity, filterByInvested, filterByAgency, filterByFocusArea,
          filterByPopulation, filterByElement, filterByEngagement);
        var filterString = allFilters.join(", ");
        $.ajax({
            url:url,
           type: "POST",
           data: JSON.stringify({
             "action" : "Log Filter",
             "user": username,
             "filters": filterString
           }),
            dataType:"json",
            success:function(data){
               if (data.status === "success") {
                 console.log("Filter log success");
               } else {
                 console.log("Filter log failed");
               }
            }.bind(this),
        });
        // Take stuff out for Year
        var filterByYearOn = true;
        var filterByYearIDs = [];
        if(!$.isArray(filterByYear) || filterByYear.length == 0){
          filterByYearOn = false;
        } else {
          for(var i = 0; i < filteredData.AndarDataOutput.length; i++){
            for(var j = 0; j < filterByYear.length; j++){
              if(JSON.stringify(filteredData.AndarDataOutput[i].grant_date.substring(0,4) + "/" + filteredData.AndarDataOutput[i].grant_end.substring(0,4))== filterByYear[j]){
                if(!this.contains(filterByYearIDs, filteredData.AndarDataOutput[i].program_andar)){
                  filterByYearIDs.push(filteredData.AndarDataOutput[i].program_andar);
                } break;
              }
            }
          }
        }
        if (filterByYearOn){
          filteredData = this.filterOutID(filteredData, filterByYearIDs);
        }

        // Take stuff out for City
        var filterByCityOn = true;
        var filterByCityIDs = [];
        if (!$.isArray(filterByCity) || filterByCity.length == 0) {
                filterByCityOn = false;
        } else {
            for (var i = 0; i < filteredData.Municipality.length; i++) {
                for(var j = 0; j < filterByCity.length; j++) {
                    if (JSON.stringify(filteredData.Municipality[i].municipality) == filterByCity[j]) {
                        if (!this.contains(filterByCityIDs, filteredData.Municipality[i].andar_id)) {
                            filterByCityIDs.push(filteredData.Municipality[i].andar_id);

                        }
                        break;
                    }
                }
            }
        }
        if (filterByCityOn) {
            filteredData = this.filterOutID(filteredData, filterByCityIDs);
        }

        // Take stuff out for Invested
        var filterByInvestedOn = true;
        var filterByInvestedIDs = [];
        if(!$.isArray(filterByInvested) || filterByInvested.length == 0){
          filterByInvestedOn = false;
          } else {
            for(var i = 0; i < filteredData.AndarDataOutput.length; i++){
              for(var j = 0; j < filterByInvested.length; j++){

               if(filteredData.AndarDataOutput[i].yearly_allocation < 5000){
                  var _invested = "less than $5000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 5000 && filteredData.AndarDataOutput[i].yearly_allocation <= 10000){
                  var _invested = "5000-$10000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 10000 && filteredData.AndarDataOutput[i].yearly_allocation <= 50000){
                  var _invested = "$10000-$50000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 50000 && filteredData.AndarDataOutput[i].yearly_allocation <= 100000){
                  var _invested = "$50000-$100000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 100000 && filteredData.AndarDataOutput[i].yearly_allocation <= 250000){
                  var _invested = "$100000-$250000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 250000 && filteredData.AndarDataOutput[i].yearly_allocation <= 500000){
                 var _invested = "250000-$500000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 500000 && filteredData.AndarDataOutput[i].yearly_allocation<= 1000000){
                  var _invested = "$500000-$1000000";
                } else if (filteredData.AndarDataOutput[i].yearly_allocation >= 1000000){
                  var _invested = "more than $1000000";
                }
                if(JSON.stringify(_invested) == filterByInvested[j]){
                  if(!this.contains(filterByInvestedIDs, filteredData.AndarDataOutput[i].program_andar)){
                    filterByInvestedIDs.push(filteredData.AndarDataOutput[i].program_andar);
                  }break;
                }
              }
            }
          }
          if(filterByInvestedOn){
            filteredData = this.filterOutID(filteredData, filterByInvestedIDs);
          }

        // Take stuff out for Agency
        var filterByAgencyOn = true;
        var filterByAgencyIDs = [];
        if(!$.isArray(filterByAgency) || filterByAgency.length == 0){
          filterByAgencyOn = false;
        } else{
          for(var i = 0; i < filteredData.Agency.length; i++){
            for(var j = 0; j < filterByAgency.length; j++){

              if(JSON.stringify(filteredData.Agency[i].name) == filterByAgency[j]){
                for(k = 0; k < filteredData.Program.length; k++ ){
                  if(JSON.stringify(filteredData.Agency[i].id) == filteredData.Program[k].agency_andar){
                    if(!this.contains(filterByAgencyIDs, filteredData.Program[k].id)){
                      filterByAgencyIDs.push(filteredData.Program[k].id);
                      }
                      break;
                    }
                }
              }
            }
          }
        }
        if (filterByAgencyOn){
          filteredData = this.filterOutID(filteredData, filterByAgencyIDs);
        }

        // Take stuff out for Focus Area
        var filterByFocusAreaOn = true;
        var filterByFocusAreaIDs = [];
        if (!$.isArray(filterByFocusArea) || filterByFocusArea.length == 0) {
            filterByFocusAreaOn = false;
        } else {
            for (var i = 0; i < filteredData.AndarDataOutput.length; i++) {
                for(var j = 0; j < filterByFocusArea.length; j++) {
                    var focusAreaOutcome = filterByFocusArea[j].subFocus;
                    if(!$.isArray(focusAreaOutcome) || focusAreaOutcome.length == 0) {
                        if(JSON.stringify(filteredData.AndarDataOutput[i].focus) == filterByFocusArea[j].mainFocus) {
                                if (!this.contains(filterByFocusAreaIDs, filteredData.AndarDataOutput[i].program_andar)) {
                                    filterByFocusAreaIDs.push(filteredData.AndarDataOutput[i].program_andar);
                                }
                        }
                    } else {
                         for(var k = 0; k < focusAreaOutcome.length; k++) {
                            if (JSON.stringify(filteredData.AndarDataOutput[i].outcome) == focusAreaOutcome[k]) {
                                if (!this.contains(filterByFocusAreaIDs, filteredData.AndarDataOutput[i].program_andar)) {
                                    filterByFocusAreaIDs.push(filteredData.AndarDataOutput[i].program_andar);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (filterByFocusAreaOn) {
            filteredData = this.filterOutID(filteredData, filterByFocusAreaIDs);
        }

        // Take stuff out for Population
        var filterByPopulationOn = true;
        var filterByPopulationIDs = [];
        if (!$.isArray(filterByPopulation) || filterByPopulation.length == 0) {
                filterByPopulationOn = false;
        } else {
            for (var i = 0; i < filteredData.TargetPopulation.length; i++) {
                for(var j = 0; j < filterByPopulation.length; j++) {
                    if (JSON.stringify(filteredData.TargetPopulation[i].population) == filterByPopulation[j]) {
                        if (!this.contains(filterByPopulationIDs, filteredData.TargetPopulation[i].andar_id)) {
                            filterByPopulationIDs.push(filteredData.TargetPopulation[i].andar_id);
                        }
                        break;
                    }
                }
            }
        }
        if (filterByPopulationOn) {
            filteredData = this.filterOutID(filteredData, filterByPopulationIDs);
        }

        // Take stuff out for Engagement
        var filterByEngagementOn = true;
        var filterByEngagementIDs = [];
        if (!$.isArray(filterByEngagement) || filterByEngagement.length == 0) {
            filterByEngagementOn = false;
        } else {
            for (var i = 0; i < filteredData.DonorEngagement.length; i++) {
                for(var j = 0; j < filterByEngagement.length; j++) {
                    if (JSON.stringify(filteredData.DonorEngagement[i].engagement) == filterByEngagement[j]) {
                        if (!this.contains(filterByEngagementIDs, filteredData.DonorEngagement[i].andar_id)) {
                            filterByEngagementIDs.push(filteredData.DonorEngagement[i].andar_id);
                        }
                        break;
                    }
                }
            }
        }
        if (filterByEngagementOn) {
            filteredData = this.filterOutID(filteredData, filterByEngagementIDs);
        }

        // Take stuff out for Element/SubElement
        var filterByElementOn = true;
        var filterByElementIDs = [];
        if (!$.isArray(filterByElement) || filterByElement.length == 0) {
            filterByElementOn = false;
        } else {
            for(var i = 0; i < filterByElement.length; i++) {
                var subElementArray = filterByElement[i].subElement;
                if(!$.isArray(subElementArray) || subElementArray.length == 0) {
                   for (var j = 0; j < filteredData.ProgramElement.length; j++) {
                        if(filterByElement[i].elementName == JSON.stringify(filteredData.ProgramElement[j].element)) {
                            if(filteredData.ProgramElement[j].level != 300) {
                                if (!this.contains(filterByElementIDs, filteredData.ProgramElement[j].andar_id)) {
                                    filterByElementIDs.push(filteredData.ProgramElement[j].andar_id);
                                }
                            }
                        }
                   }
                } else {
                    var mainElementName = filterByElement[i].elementName;
                    for (var k = 0; k < subElementArray.length; k++) {
                        for (var l = 0; l < filteredData.ProgramSubElement.length; l++) {
                            if(subElementArray[k] == JSON.stringify(filteredData.ProgramSubElement[l].subElement) && mainElementName == JSON.stringify(filteredData.ProgramSubElement[l].element)) {
                                if (!this.contains(filterByElementIDs, filteredData.ProgramSubElement[l].andar_id)) {
                                    filterByElementIDs.push(filteredData.ProgramSubElement[l].andar_id);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (filterByElementOn) {
            filteredData = this.filterOutID(filteredData, filterByElementIDs);
        }

        // Take stuff out of Geo Area
        var filterByGeoAreaOn = true;
        var filterByGeoAreaIDs = [];
        if(!$.isArray(filterByGeoArea) || filterByGeoArea.length == 0){
          filterByGeoAreaOn = false;
        } else {
          for(var i = 0; i < filteredData.GeoArea.length; i++){
            for(var j = 0; j < filterByGeoArea.length; j++){
              if(JSON.stringify(filteredData.GeoArea[i].area) == filterByGeoArea[j]){
                if (!this.contains(filterByGeoAreaIDs, filteredData.GeoArea[i].andar_id)) {
                  filterByGeoAreaIDs.push(filteredData.GeoArea[i].andar_id);
              }
              break;
            }
          }
        } 
      } if(filterByGeoAreaOn){
        filteredData = this.filterOutID(filteredData, filterByGeoAreaIDs);
      }

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

        // Filter Agency
        for(var i = 0; i < data.Program.length; i++){
          var programID = data.Program[i].id;
          if(!this.contains(filterIDs, programID)){
            var agencyID = JSON.stringify(data.Program[i].agency_andar)
            var agencyIndex = -1;
            for(var j = 0; j < filteredData.Agency.length; j++){
              if(JSON.stringify(filteredData.Agency[j].id) == agencyID){
                agencyIndex = j;
                break;
              }
            }
            if(agencyIndex > -1){
              filteredData.Agency.splice(agencyIndex,1);
            }
          }
        }

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
                    }}>Dashboard Page</h2> <hr />
                    <br/>
                    <div className="row">


                        <FilterByInvested ref={filterbyinvested => { this._filterByInvested = filterbyinvested}} data={this.state.data}/>

                    </div>
                    <div className="row">
                        <FilterByYear ref={filterbyyear => { this._filterByYear = filterbyyear}} data={this.state.data}/>
                        <FilterByCity ref={filterbycity => { this._filterByCity = filterbycity}} data={this.state.data}/>
                        <FilterByAgency ref={filterbyagency => { this._filterByAgency = filterbyagency}} data={this.state.data}/>
                        <FilterByPopulation ref={filterbypopulation => { this._filterByPopulation = filterbypopulation }} data={this.state.data}/>
                        <FilterByEngagement ref={filterbyengagement => { this._filterByEngagement = filterbyengagement}} data={this.state.data}/>
                        <FilterByGeoArea ref={filterbygeoarea => {this._filterByGeoArea = filterbygeoarea}} data ={this.state.data}/>
                 </div>
										<div className="row">
                      <FilterByFocusArea ref={filterbyfocusarea => { this._filterByFocusArea = filterbyfocusarea }} data={this.state.data} />
                      <hr />
											<FilterByElement ref={filterbyelement => { this._filterByElement = filterbyelement}} data={this.state.data}/>
										</div>
										<div className="row">
											<button className="button info" onClick={this.generateGraphs} style={{
													margin: "20px"
											}}>Apply Filter</button>
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
