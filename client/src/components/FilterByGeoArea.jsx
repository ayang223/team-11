var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByGeoArea = React.createClass({

	getInitialState:function(){
		return{
			value: [], 
			disabled: false, 
			selectValue: [],
		};
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
		for (var i = 0; i < geoArea.length; i++){
			var object = {
				label: "",
				value: ""
			}
			object.label = geoArea[i].area;
			object.value = geoArea[i].area;
			var isDup = false;
			for(var j = 0; j < geoAreaArr.length; j++){
				if(object.value == geoAreaArr[j].value){
					isDup = true;
					break;
				}
			}
			if(isDup){
				console.log("dupe in geo area");
			} else {
				geoAreaArr.push(object)
			}
		}
		return geoAreaArr;
	},

	render:function(){
    var dataFromDash = this.props.data;
    var message = 'FilterByGeoArea: ' + this.state.selectValue;
    var geoAreaArr = this.createMetadata(dataFromDash);

    return(
      <div>
        <label>Geo Area Filter</label>
        <Select placeholder="Select Geo Area" multi disabled={this.state.disabled} value={this.state.value} options={geoAreaArr} onChange={this.handleChange}  />
        </div>
    )
  }
})

module.exports = FilterByGeoArea;