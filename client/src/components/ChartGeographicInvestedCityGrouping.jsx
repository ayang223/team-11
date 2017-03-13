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
  createMetadata: function(data) {
    var metadata = {};
    metadata.labels = Object.keys(this.cityGroupings);
    metadata.datasets = [];
    var datasetInfo = {};
    var moneyInvestedData = [];

    var andarDataOutput =  data.AndarDataOutput;
    var program = data.Program;
    for(var i = 0; i < andarDataOutput.length; i++) {
        var currentYearlyAllocation = andarDataOutput[i].yearly_allocation;
        var currentProgramAndar = andarDataOutput[i].program_andar;
        var currentProgramName = null;

        for(var j = 0; j < program.length; j++) {
            var currentProgramID = program[j].id;
            if(currentProgramID == currentProgramAndar) {
                currentProgramName = program[j].name;
            }
        }
        if(currentProgramName != null) {
            moneyInvestedData.push(currentYearlyAllocation);
            metadata.labels.push(currentProgramName);
        }
    }

    datasetInfo.label = "Money Invested";
    datasetInfo.backgroundColor = "#FF6384";
    datasetInfo.borderColor = "rgba(255,99,132,1)";
    datasetInfo.borderWidth = 1;
    datasetInfo.hoverBackgroundColor = "rgba(255,99,132,0.4)";
    datasetInfo.hoverBorderColor= "rgba(255,99,132,1)";

    datasetInfo.data = [];
    for(var i = 0; i < moneyInvestedData.length; i++) {
        datasetInfo.data.push(moneyInvestedData[i]);
    }

    metadata.datasets.push(datasetInfo)

    return metadata;
  },
  render() {
    var dataFromDash = this.props.data;
    var title = "Geographic Distribution based on Money Invested with City Groupings:"

    var metadata = this.createMetadata(dataFromDash)


    return (
      <div className="row">
        <h2 style={{textAlign:"left"}}>{title}</h2>
        <Pie data={metadata}/>
        </div>
    );
  }
});
module.exports = ChartGeographicInvestedCityGrouping;
