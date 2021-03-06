import sha256 from 'js-sha256';
import Login from '../scenes/Login.jsx';
import cookie from 'react-cookie';
var React = require('react');
var url = require('url');
var $ = require('jQuery');

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
      url: url,
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
       var innerStyle = {
         width:"500px",
         height:"600px",
         padding: "50px",
         backgroundColor: "#f0f0f5",
         color: "#474747",
         display: "inline-block",
         fontFamily: "sans-serif",
         fontSize: "18",
         textAlign: "left",
         boxShadow: "10px 10px 5px #888888"
       };
     return (
       <div className="row">
       <div style={innerStyle}>
       <form onFormAccount={this.onFormAccount}>
         <div className="row">
           <h4>Password Change</h4> <hr />
         <p> Old password </p> <hr />
         <input type="password" ref="oldpassword" placeholder="Please enter your old password. "/>
         </div>
         <div className="row">
         <p> New password </p><hr />
         <input type="password" ref="newpassword" placeholder="Please enter your new password"/>
         </div>
         <div className="row">
         <p> Verify new password </p><hr />
         <input type="password" ref="verifynewpassword" placeholder="Please re-enter your new password"/>
         </div>
         <br/>
         <div className="row">
         <button className="button medium-centered " style={{float: "right"}} onClick={this.onFormSubmit}>Change password</button>
         </div>
     </form>
     </div>
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
     <h2 style={{margin:"20px", textAlign: "center"}}>Account Page</h2> <hr />
     <AccountForm onNewAccount={this.handleNewAccount}/>
     </div>
    );
  }
});


module.exports = Account;
