import React from 'react';
import {Pie} from 'react-chartjs-2';

var ChartGeographicInvestedCityGrouping=React.createClass({
  displayName: 'Geographic Distribution based on Money Invested with City Groupings',
  cityGroupings: {
    "Langley": [
      "Langley, City of",
      "Langley, District Municipality"
    ],
    "Tri-cities": [
      "Anmore",
      "Belcarra",
      "Coquitlam",
      "Port Coquitlam",
      "Port Moody"
    ],
    "Northshore": [
        "North Vancouver",
        "City of	North Vancouver, District Municipality",
        "West Vancouver",
        "Bowen Island"
    ],
    "Sea to Sky": [
      "Lions Bay",
      "Lillooet",
      "Pemberton",
      "Squamish",
      "Whistler"
    ],
    "Sunshine Coast": [
      "Elphinstone",
      "Gibsons",
      "Halfmoon Bay",
      "Pender Harbour / Egmont / Madeira Park",
      "Roberts Creek",
      "Sechelt District Municipality",
      "Sechelt Indian Government District (Part-Sunshine Coast)",
      "West Howe Sound (Langdale, Port Mellon, Williamson’s Landing, Granthams Landing, Soames, Hopkins Landing, and Gambier and Keats Islands)"
    ],
    "Fraser Cascade": [
      "Mission",
      "Hope",
      "Kent",
      "Harrison Hot Springs",
      "Boston Bar / North Bend",
      "Dogwood Valley / Emory Creek / Choate / Sunshine Valley / Laidlaw / Spuzzum",
      "Lake Errock / Harrison Mills / Hemlock Valley",
      "Popkum / Bridal Falls",
      "Slesse Park / Baker Trails / Bell Acres",
      "Miracle Valley / Hatzic Prairie"
    ],
    "Burnaby": [
      "Burnaby"
    ],
    "Delta": [
      "Delta"
    ],
    "Maple Ridge/Pitt Meadows": [
      "Maple Ridge",
      "Pitt Meadows"
    ],
    "New Westminster": [
      "New Westminster"
    ],
    "Richmond": [
      "Richmond"
    ],
    "Surrey/White Rock": [
      "Surrey",
      "White Rock"
    ],
    "Vancouver": [
      "Vancouver"
    ],
    "Abbotsford": [
      "Abbotsford"
    ],
    "Chilliwack": [
      "Chilliwack"
    ],
    "Mission": [
      "Mission"
    ],
    "Other Areas in BC": [
      "Other Areas"
    ],
    "First Nation Territories": [
      "First Nation Territories",
      "Tsawwassen First Nation",
      "Sechelt Indian Government District (Part-Sunshine Coast)"
    ]
  },
  getInitialState:function(){
    return {data: this.props.data};
  },
  getGrouping: function(city) {
    var cityGroups = Object.keys(this.cityGroupings);
    for (var i = 0; i < cityGroups.length; i++) {
      var cities = this.cityGroupings[cityGroups[i]];
      for (var j = 0; j < cities.length; j++) {
        if (city === cities[j]) {
          return cityGroups[i];
        }
      }
    }
    return null;
  },
  createMetadata: function(data) {
    var cityGroups = Object.keys(this.cityGroupings);
    var metadata = {};
    metadata.labels = cityGroups;
    metadata.datasets = [];
    var datasetInfo = {};
    var moneyInvestedData = [];

    var andarDataOutput =  data.AndarDataOutput;
    var municipality = data.Municipality;

    var sortedMunicipality = {};
    // preprocess municipality to reduce time complexity
    for (var i = 0; i < municipality.length; i++) {
      var currentAndar = municipality[i].andar_id;
      var group = this.getGrouping(municipality[i].municipality);
      if (group) {
        if (currentAndar in sortedMunicipality) {
          if (group in sortedMunicipality[currentAndar]) {
            sortedMunicipality[currentAndar][group] += municipality[i].focus_percentage;
          } else {
            sortedMunicipality[currentAndar][group] = municipality[i].focus_percentage;
          }
        } else {
          sortedMunicipality[currentAndar] = {};
          sortedMunicipality[currentAndar][group] = municipality[i].focus_percentage;
        }
      }
    }

    var totalInvested = {};
    for (var i = 0; i < cityGroups.length; i++) {
      totalInvested[cityGroups[i]] = 0;
    }

    for (var i = 0; i < andarDataOutput.length; i++) {
      var currentProgramAndar = andarDataOutput[i].program_andar;
      var currentYearlyAllocation = andarDataOutput[i].yearly_allocation;
      if (currentProgramAndar in sortedMunicipality) {
        var areas = Object.keys(sortedMunicipality[currentProgramAndar]);
        for (var j = 0; j < areas.length; j++) {
          var currentArea = areas[j];
          if (currentArea in sortedMunicipality[currentProgramAndar]) {
            var currentAreaProportion = sortedMunicipality[currentProgramAndar][currentArea] * 0.01;
            totalInvested[currentArea] += currentYearlyAllocation * currentAreaProportion;
          }
        }
      }
    }

    datasetInfo.label = "Geographic Distribution";
    datasetInfo.backgroundColor = ["#023fa5", "#7d87b9", "#bec1d4", "#d6bcc0", "#bb7784", "#8e063b", "#4a6fe3", "#8595e1", "#b5bbe3", "#e6afb9", "#e07b91", "#d33f6a", "#11c638", "#8dd593", "#c6dec7", "#ead3c6", "#f0b98d", "#ef9708"];
    datasetInfo.hoverBorderWidth = 5;

    datasetInfo.data = [];
    for (var i = 0; i < cityGroups.length; i++) {
      datasetInfo.data.push(totalInvested[cityGroups[i]]);
    }
    metadata.datasets.push(datasetInfo);

    return metadata;
  },
  render() {
    var title = "Geographic Distribution based on Money Invested with City Groupings ";

    var metadata = this.createMetadata(this.state.data);

    var options = {};
    options.tooltips = {};
    options.tooltips.callbacks = {};
    options.tooltips.callbacks.label = function(tooltipItem, data) {
			var allData = data.datasets[tooltipItem.datasetIndex].data;
			var tooltipLabel = data.labels[tooltipItem.index];
			var tooltipData = allData[tooltipItem.index];
			var total = 0;
			for (var i in allData) {
				total += allData[i];
			}
			var tooltipPercentage = Math.round((tooltipData / total) * 100);
			return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
		}

    return (
      <div className="large-6 columns">
        <h4 style={{textAlign: "center"}}>{title}</h4><hr/>
        <Pie data={metadata} options={options} width={1400} height={600}/>
      </div>
    );
  }
});
module.exports = ChartGeographicInvestedCityGrouping;
