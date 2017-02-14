var React = require('react');
var Servlet = require('src/components/Servlet.jsx');
var Ajax = require('react-ajax');

var Test = React.createClass({
	getInitialState: function() {
      return {
        entries: []
      };
    },
	getServlet:function(){
		console.log("inside getServlet");
		$.ajax({
			url:"http://localhost:8080/BackendServer/DatabaseServlet",
			dataType:"JSON",
			success:function(data){
				this.setState({users: data});
				console.log("success");
			}.bind(this),
			error:function(error){
				console.log("error");
			}
		});
	},

  render: function(){
    return(
      <div>
        <h2>Dashboard Page</h2>
        <getServlet />
        response: {this.state.users}
      </div>
    )
  }
})

module.exports = Test;
