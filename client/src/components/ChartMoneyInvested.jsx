import React from 'react';
import {Bar} from 'react-chartjs-2';

var ChartMoneyInvested=React.createClass({
  createMetadata: function(data) {
    var metadata = {};
    var labels = [];
    var datasets = [];
    var datasetInfo = {};

    metadata.labels = labels;
    metadata.datasets = datasets;

    // Replace with for loop parse of data values  (Program Name)
    metadata.labels.push("Vancouver");
    metadata.labels.push("Surrey");
    metadata.labels.push("Richmond");
    metadata.labels.push("Tri-Cities");
    metadata.labels.push("Langley");

    datasetInfo.label = "Money Invested";
    datasetInfo.backgroundColor = "#FF6384";
    datasetInfo.borderColor = "rgba(255,99,132,1)";
    datasetInfo.borderWidth = 1;
    datasetInfo.hoverBackgroundColor = "rgba(255,99,132,0.4)";
    datasetInfo.hoverBorderColor= "rgba(255,99,132,1)";

    // Replace with for loop parse of data values (Yearly Allocation?)
    datasetInfo.data = [300, 50, 100, 200, 150];

    metadata.datasets.push(datasetInfo)

    return metadata;
  },
  render() {
    var dataFromDash = this.props.data;
    var testText = "Bar Chart metadata:"

    var metadata = this.createMetadata(dataFromDash)


    return (
      <div className="row">
        <h2 style={{textAlign:"left"}}>{testText} {JSON.stringify(metadata)}</h2>
        <Bar data={metadata} />
        </div>
    );
  }
});
module.exports = ChartMoneyInvested;
