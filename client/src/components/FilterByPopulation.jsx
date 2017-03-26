var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByPopulation = React.createClass({
  getInitialState:function(){
    return {
      value: [],
      disabled : false,
      selectValue: [],
    };
  },
    handleChange: function(value) {
      this.setState({
        value : value
      } , () => {
        var selectArr = [];
        for(var i = 0; i < this.state.value.length; i++){
          selectArr.push(JSON.stringify(this.state.value[i].value));
        }
        this.setState({
          selectValue: selectArr
        });
      });
    },

    createMetadata: function(data) {
        var metadata = {};
        var pop = data.TargetPopulation;
        var popArr = [];
        for (var i = 0; i < pop.length; i++) {
            var object = {
                label: "",
                value: ""
            }
            object.label = pop[i].population;
            object.value = pop[i].population;
            var isDup = false;
            for(var j = 0; j < popArr.length; j++){
              if(object.value == popArr[j].value){
                isDup = true;
                break;
              }
            }
            if (isDup) {
                //console.log("population true")
            } else{
              popArr.push(object);
            }
        }
        return popArr;
    },

    render: function() {
        var dataFromDash = this.props.data;
        var message = 'FilterByPopulation: ' + this.state.selectValue;
        var popArr = this.createMetadata(dataFromDash);

        return (
            <div>
                <label>Target Population Filter</label>
                <Select placeholder="Select Population" multi disabled={this.state.disabled} value={this.state.value} options={popArr} onChange={this.handleChange}/>
            </div>
        )
    }
})

module.exports = FilterByPopulation;
