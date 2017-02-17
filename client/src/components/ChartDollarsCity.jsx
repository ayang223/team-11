import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'Vancouver',
		'Surrey',
		'Richmond',
		'Tri-Cities',
		'Langely'
	],
	datasets: [{
		data: [300, 50, 100, 200, 150],
		hoverBorderWidth: [20, 20, 20, 20, 20],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56',
		'#33cc33',
		'#cc3399'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56',
		'#33cc33',
		'#cc3399'
		]
	}]
};

var ChartDollarsCity=React.createClass({
  displayName: 'DoughnutExample',
  render() {
    return (
      <div className="row">
        <h2 style={{textAlign:"left"}}>Doughnut Example</h2>
        <Doughnut data={data} />
        </div>
    );
  }
});
module.exports = ChartDollarsCity;
