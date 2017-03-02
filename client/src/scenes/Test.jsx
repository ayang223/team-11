var React = require('react');
var Servlet = require('src/components/Servlet.jsx');

var Test = React.createClass({
    getInitialState: function() {
     return {
       entries: []
     };
   },
    getServlet:function(){
      var username = "Main_Admin";
      var password = "main";
        $.ajax({
            url:"http://localhost:8080/BackendServer/DatabaseServlet",
           type: "POST",
           //data: "{\"action\": \"Login User\",\"user\": \"Main_Admin\" , \"password\" : \"main\"}",
           data: JSON.stringify({
             "action" : "Login User",
             "user": username,
             "password": password
           }),
            dataType:"json",
            success:function(data){
               console.log(data)
               document.getElementById('out').innerHTML = JSON.stringify(data);
            }.bind(this),
            error:function(error){
               document.getElementById('out').innerHTML = error;
              console.log(error);
            }
        });
    },

 render: function(){
   return(
     <div>
       <h2>Dashboard Page</h2>
       <input type="button" ref="button" value="Test Servlet" onClick={this.getServlet} />
       <div id="out">
       </div>
     </div>
   )
 }
})

module.exports = Test;
