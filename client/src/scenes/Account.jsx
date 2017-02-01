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
       <div className="x">
       <form onFormAccount={this.onFormAccount}>
         <div className="pass">
         <p> Old password: </p>
         <input type="password" ref="oldpassword" placeholder="Please enter your old password. "/>
         </div>
         <div className="pass">
         <p> New password: </p>
         <input type="password" ref="newpassword" placeholder="Please enter your new password"/>
         </div>
         <div className="pass">
         <p> Verify new password: </p>
         <input type="password" ref="verifynewpassword" placeholder="Please re-enter your new password"/>
         </div>
         <button className="button small-centered text-center columns" type="submit">Create account</button>
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
    return (
     <div>
     <h2>Account Page</h2>
     <AccountForm onNewAccount={this.handleNewAccount}/>
     </div>
    );
  }
});

module.exports = Account;
