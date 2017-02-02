var React = require('react');
var Ajax = require('react-ajax');

var Servlet = React.createClass({
	getServlet:function(){
		// <Ajax url="http://localhost:8080/BackendServer/DatabaseServlet"
		// method="GET"
		// onResponse={this.responseHandler}/>
		$.ajax({
			url: 'http://localhost:8080/BackendServer/DatabaseServlet',
			type:'GET',
			success: function(data){
				this.setState({data:data});
			}
		});

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