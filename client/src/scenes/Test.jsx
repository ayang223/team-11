var React = require('react');
var Servlet = require('src/components/Servlet.jsx');
var Ajax = require('react-ajax');

var Test = React.createClass({
	getServlet:function(){
		$.ajax({
			url:"http://localhost:8080/BackendServer/DatabaseServlet",
			dataType:"JSON",
			success:function(data){
				this.setState({users: data});
				console.log("success");
			}
		});
	},

  render: function(){
    return(
      <div>
        <h2>Dashboard Page</h2>
        response: {this.state.users}
      </div>
    )
  }
})

module.exports = Test;
