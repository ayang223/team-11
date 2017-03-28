var React = require('react');
var array = [];
var Select = require('react-select');

var FilterByInvested = React.createClass({
    getInitialState: function() {
        return {value: [], disabled: false, selectValue: []};
    },
    handleChange: function(value) {
        this.setState({
            value: value
        }, () => {
            var selectArr = [];
            for (var i = 0; i < this.state.value.length; i++) {
                selectArr.push(JSON.stringify(this.state.value[i].value));
            }
            this.setState({selectValue: selectArr});
        });
    },
    createMetadata: function(data) {
        var metadata = {};
        var invested = data.AndarDataOutput;
        var investedArr = [];
        var investedFilterArr = [];
        for (var i = 0; i < invested.length; i++) {
            investedArr.push(invested[i].yearly_allocation)
        }
        for (var i = 0; i < investedArr.length; i++) {
            var object = {
                label: "",
                value: ""
            }
            var isDup = false;
            if (investedArr[i] < 5000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "less than $5000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "less than $5000";
                    object.value = "less than $5000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] < investedArr[i] >= 5000 && investedArr[i] <= 10000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$5000-$10000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$5000-$10000";
                    object.value = "$5000-$10000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 10000 && investedArr[i] <= 50000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$10000-$50000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$10000-$50000";
                    object.value = "$10000-$50000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 50000 && investedArr[i] <= 100000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$50000-$100000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$50000-$100000";
                    object.value = "$50000-$100000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 100000 && investedArr[i] <= 250000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$100000-$250000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$100000-$250000";
                    object.value = "$100000-$250000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 250000 && investedArr[i] <= 500000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$250000-$500000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$250000-$500000";
                    object.value = "$250000-$500000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 500000 && investedArr[i] <= 1000000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "$500000-$1000000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "$500000-$1000000";
                    object.value = "$500000-$1000000";
                    investedFilterArr.push(object);
                }
            } else if (investedArr[i] >= 1000000) {
                for (var j = 0; j < investedFilterArr.length; j++) {
                    if (investedFilterArr[j].value == "more than $1000000") {
                        isDup = true;
                    }
                }
                if (isDup) {
                    //  console.log("less than $5000 exists")
                } else {
                    object.label = "more than $1000000";
                    object.value = "more than $1000000";
                    investedFilterArr.push(object);
                }
            }
        }
        //console.log("filter contins: " +  investedFilterArr);
        return investedFilterArr;
    },
    render: function() {
        var dataFromDash = this.props.data;
        var message = 'FilterByInvested: ' + this.state.selectValue;
        var investedFilterArr = this.createMetadata(dataFromDash);
        return (
          <div>
              <label>Investment Filter</label>
              <Select placeholder="Select Investment Range" multi disabled={this.state.disabled} value={this.state.value} options={investedFilterArr} onChange={this.handleChange}/>
          </div>
        )
    }
})

module.exports = FilterByInvested;
