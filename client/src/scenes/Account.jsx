var React = require('react');

var AccountForm = React.createClass({
   onFormSubmit: function(e){
     e.preventDefault();

     var oldpassword = this.refs.oldpassword.value;
     var newpassword = this.refs.newpassword.value;
     var verifynewpassword = this.refs.verifynewpassword.value;

     if(oldpassword.length > 0 && newpassword.length > 0 && verifynewpassword.length > 0 ){
       this.refs.oldpassword.value = '';
       this.refs.newpassword.value = '';
       this.refs.verifynewpassword.value = '';
       this.props.onNewAccount(oldpassword,newpassword,verifynewpassword);
     }
   },

     render: function(){
     return (
       <div className="row">
       <form onFormAccount={this.onFormAccount}>
         <div className="row">
         <div className="medium-6 columns">
         <p> Old password: </p>
         <input type="password" ref="oldpassword" placeholder="Please enter your old password. "/>
         </div>
         </div>
         <div className="row">
         <div className="medium-6 columns">
         <p> New password: </p>
         <input type="password" ref="newpassword" placeholder="Please enter your new password"/>
         </div>
         </div>
         <div className="row">
         <div className="medium-6 columns">
         <p> Verify new password: </p>
         <input type="password" ref="verifynewpassword" placeholder="Please re-enter your new password"/>
         </div>
         </div>
         <div className="row">
         <button className="button small-centered text-center columns" type="submit" style={{width:150, height:40}}>Create account</button>
         </div>
     </form>
     </div>
     )
   }
 })

var Account = React.createClass({

  getDefaultProps:function(){
     return {
       oldpassword: '',
       newpassword: '',
       verifynewpassword:'',
     };
  },

  getInitialState:function(){
     return{
       oldpassword: this.oldpassword,
       newpassword: this.newpassword,
       verifynewpassword: this.verifynewpassword,
     }
  },

  handleNewAccount: function(oldpassword, newpassword,verifynewpassword){
     this.setState({oldpassword: oldpassword,
                    newpassword: newpassword,
                    verifynewpassword:verifynewpassword
     })
  },

  render: function() {
    var isAdmin = true;
    var oldpassword = this.state.oldpassword;
    var newpassword = this.state.newpassword;
    var verifynewpassword = this.state.verifynewpassword;
    
    return(
      <div>
      {isAdmin? getAdminPage :
      <div>
     <h2>Account Page</h2>
     <AccountForm onNewAccount={this.handleNewAccount}/>
    </div>
       }
       </div>
    );
  }
})

var getAdminPage = React.createClass({
  getUsers:function(){
    $a.jax({
      url:"http://localhost:8080/BackendServer/DatabaseServlet",
      type: "POST",
      data: "{\"action\": \"List User\"}",
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


module.exports = Account;
