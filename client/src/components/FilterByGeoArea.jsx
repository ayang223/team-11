var React = require('react');
var array = [];

var FilterByGeoArea = React.createClass({

	getInitialState:function(){
		return{value: [], disabled: false, selectValue: []}
	},

	handleChange:function(value){
		this.setState({
			value: value
		}, () => {
			var selectArr = [];
			for (var i = 0 ; i < this.state.value.length; i++){
				selectArr.push(JSON.stringify(this.state.value[i].value));
			}
			this.setState({selectValue: selectArr});
		});
	},

	createMetadata:function(data){
		var metadata = {};
		var geoArea = data.GeoArea;
		var geoAreaArr = [];
		
	}


})