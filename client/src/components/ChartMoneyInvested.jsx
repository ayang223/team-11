import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

var ChartMoneyInvested=React.createClass({

  getInitialState:function(){
    return {data: this.props.data};
  },
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
    var title = "Money Invested Bar Chart ";

    var metadata = this.createMetadata(this.state.data);
    var heightValue = 600;
    if(metadata.datasets[0].data.length > 15) {
        heightValue = metadata.datasets[0].data.length * 40;
    }
    return (
      <div className="large-6 columns">
        <h4 style={{textAlign: "center"}}>{title}</h4><hr />
        <HorizontalBar data={metadata} width={1400}
        height={heightValue}/>
        </div>
    );
  }
});
module.exports = ChartMoneyInvested;
