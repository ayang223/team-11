
var React = require('react');
var Ajax = require('react-ajax');

var Servlet = React.createClass({
	getServlet:function(){
		<Ajax url="http://localhost:8080/BackendServer/DatabaseServlet"
		method="POST"
		body={JSON.stringify({“action”: “List User”,
										“user”: “Admin”,
										“password: “Password”,	})}
		onResponse={this.responseHandler}/>

	},

	render:function(){
		return(
			 <div>
			 <p>{this.getServlet}</p>

			 </div>
			);
	}

});

module.exports = Servlet;