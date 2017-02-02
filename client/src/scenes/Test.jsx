var React = require('react');
var Servlet = require('src/components/Servlet.jsx');

var Test = React.createClass({

  render: function(){
    return(
      <div>
        <h2>Dashboard Page</h2>
        <Servlet/>
      </div>
    )
  }
})

module.exports = Test;
