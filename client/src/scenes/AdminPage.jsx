var React = require('react');

var AdminPage = React.createClass({
    getUsers:function(){
        $.ajax({
            url:"http://localhost:8080/BackendServer/DatabaseServlet",
           type: "POST",
           data: JSON.stringify({
             "action" : "List User"
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
  createUser:function(){
    return(null)
  },

  render:function(){
    return(
     <div>
       <h2>Dashboard Page</h2>
       <input type="button" ref="button" value="Get Users" onClick={this.getUsers} />
       <div id="out">
       </div>
     </div>
      )
  }
});


module.exports = AdminPage;
