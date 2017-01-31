var React = require('react');
var FilterByYear = require('FilterByYear');

var Dashboard = React.createClass({
  render: function(){
    return(
      <div>
        <h2>Dashboard Page</h2>
        <FilterByYear />
      </div>
    )
  }
})

module.exports = Dashboard;
