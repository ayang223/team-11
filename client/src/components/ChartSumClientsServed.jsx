import React from 'react';
import {Bar} from 'react-chartjs-2';

var ChartSumClientsServed=React.createClass({
  createMetadata: function(data) {
    var metadata = {};
    var labels = [];
    var datasets = [];
    var datasetInfo = {};
    var totalEarlyYears = 0;
    var totalMiddleYears = 0;
    var totalSeniors = 0;
    var totalParents = 0;
    var totalFamilies = 0;
    var totalClients = 0;

    metadata.labels = labels;
    metadata.datasets = datasets;

    metadata.labels.push("# Early Years (0-6yrs)");
    metadata.labels.push("# Middle Years (6-12)");
    metadata.labels.push("# Seniors");
    metadata.labels.push("# Parents/Caregivers");
    metadata.labels.push("# Families");
    metadata.labels.push("# Total Clients");

    var outputs = data.Outputs;

    for(var i = 0; i < outputs.length; i++) {
        var currentOutput = outputs[i];
        var currentType = currentOutput.type;
        var currentValue = currentOutput.value;
        switch(currentType) {
            case "Early Years (0-6yrs)":
                totalEarlyYears += currentValue;
                break;
            case "Middle Years (6-12)":
                totalMiddleYears += currentValue;
                break;
            case "Seniors":
                totalSeniors += currentValue;
                break;
            case "Parents/Caregivers":
                totalParents += currentValue;
                break;
            case "Families":
                totalFamilies += currentValue;
                break;
            case "Total Clients":
                totalClients += currentValue;
                break;
            default:
                //do nothing
        }
    }

    datasetInfo.label = 'All Filtered Programs';
    datasetInfo.backgroundColor = '#36A2EB';
    datasetInfo.borderWidth = 1;

    var totalRow = [];
    totalRow.push(totalEarlyYears);
    totalRow.push(totalMiddleYears);
    totalRow.push(totalSeniors);
    totalRow.push(totalParents);
    totalRow.push(totalFamilies);
    totalRow.push(totalClients);

    datasetInfo.data = totalRow;

    metadata.datasets.push(datasetInfo)

    return metadata;
  },
  render() {
    var dataFromDash = this.props.data;
    var title = "Clients Served Chart:";

    var metadata = this.createMetadata(dataFromDash);

    return (
      <div className="large-6 columns">
        <h2 style={{textAlign:"left"}}>{title}</h2>
        <Bar
            data={metadata}
            width={1400}
            height={600}
        />
        </div>
    );
  }
});
module.exports = ChartSumClientsServed;
