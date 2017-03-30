var React = require('react');

var Export = React.createClass({
	getInitialState(){
		return{
			data: this.props.data
		}
	},

	render: function(){

	var dashData = this.state.data;
	console.log(dashData);
		return(
		<div>
		<h2>Export Page </h2>
		</div>
		)
	}
});

module.exports = Export;