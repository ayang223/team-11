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
<<<<<<< HEAD
    var dataFromDash = this.props.data;
    var title = "Money Invested Bar Chart:";

    var metadata = this.createMetadata(this.state.data);
    var outerStyle ={
      paddingLeft:15,
      paddingRight:30,
      width:960,
      height:500,
    }

    return (
      <div style={outerStyle}>
        <h2 style={{textAlign:"left"}}>{title}</h2>
        <HorizontalBar data={metadata}/>
        </div>
    );
  }
});
module.exports = ChartMoneyInvested;
