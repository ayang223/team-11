var React = require('react');

var AdminPage = React.createClass({
  getUsers:function(){
    $a.jax({
      url:"http://localhost:8080/BackendServer/DatabaseServlet",
      type: "POST",
      data: JSON.stringify({
      	"action": "List User"
      }),
      dataType: "json",
      succuess:function(data){
        console.log(data)
        document.getElementById('out').innerHTML = JSON.stringify(data);
        console.log("success");
      }.bind(this),
      error:function(error){
        document.getElementById('out').innerHTML = error;
        console.log("error");
      }
    });
  },

  createUser:function(){
    return(
      <div>
      <p>create user page</p>
      </div>
    )
  },

  render:function(){
    return(
      <div>
      <input type="button" ref="button" value="Get Users" onClick={this.getUsers}/>
      <div id="out">
      </div>
      <div>
      {createUser}
      </div>
      </div>
      )
  }
});


module.exports = AdminPage;
