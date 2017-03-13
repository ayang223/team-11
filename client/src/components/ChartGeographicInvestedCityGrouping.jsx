import React from 'react';
import {Pie} from 'react-chartjs-2';

var ChartGeographicInvestedCityGrouping=React.createClass({
  displayName: 'Geographic Distribution based on Money Invested with City Groupings',
  createMetadata: function(data) {
    var metadata = {};
    var labels = [];
    var datasets = [];
    var datasetInfo = {};
    var moneyInvestedData = [];

    metadata.labels = labels;
    metadata.datasets = datasets;

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
