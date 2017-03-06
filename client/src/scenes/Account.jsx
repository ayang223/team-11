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
        {isAdmin? 
          <div>
            <p>admin page</p>
          </div> :
    <div>
     <h2>Account Page</h2>
     <AccountForm onNewAccount={this.handleNewAccount}/>
     </div>

    }
    </div>
    );
  }
});


module.exports = Account;
