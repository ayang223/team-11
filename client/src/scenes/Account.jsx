import sha256 from 'js-sha256';
import Login from '../scenes/Login.jsx';
import cookie from 'react-cookie';
var React = require('react');

var AccountForm = React.createClass({
   onFormSubmit: function(e){
     e.preventDefault();

     var username = cookie.load('userID');

     var oldpassword = this.refs.oldpassword.value;
     var newpassword = this.refs.newpassword.value;
     var verifynewpassword = this.refs.verifynewpassword.value;

     if(oldpassword.length > 0 && newpassword.length > 0 && verifynewpassword.length > 0 ){
       this.refs.oldpassword.value = '';
       this.refs.newpassword.value = '';
       this.refs.verifynewpassword.value = '';
       this.props.onNewAccount(oldpassword,newpassword,verifynewpassword);
     }

     if(newpassword.length != verifynewpassword.length || newpassword != verifynewpassword){
       alert("passwords do not match");
       return
     }

     var encryptedOldPassword = sha256(oldpassword);
     var encryptedNewPassword = sha256(newpassword);
     $.ajax({
      url: "http://localhost:8080/BackendServer/DatabaseServlet",
      type:"POST",
      data: JSON.stringify({
        "action":"Change Password",
        "user": username,
        "old_password": encryptedOldPassword,
        "new_password": encryptedNewPassword
      }),
      success:function(data){
        console.log(data)
      }.bind(this),
      error:function(error){
        console.log(error);
      }
    })
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
         <button className="button small-centered text-center columns" type="submit" style={{width:150, height:40}} onClick={this.onFormSubmit}>Change password</button>
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
    var oldpassword = this.state.oldpassword;
    var newpassword = this.state.newpassword;
    var verifynewpassword = this.state.verifynewpassword;

    return(
      <div>
     <h2>Account Page</h2>
     <AccountForm onNewAccount={this.handleNewAccount}/>
     </div>
    );
  }
});


module.exports = Account;
