/**
 * Created by nathan on 21/01/17.
 */
 var React = require('react');

 var LoginForm = React.createClass({
   onFormSubmit: function(e){
     e.preventDefault();

     var username = this.refs.username.value;
     var password = this.refs.password.value;
     if(username.length >0 && password.length > 0){
       this.props.onNewLogin(username,password);
     }
   },
   render: function(){
     return (
       <div className="row">
       <form onFormSubmit={this.onFormSubmit}>
         <div className="medium-6 columns center">
         <input type="text" ref="username" placeholder="Enter username here"/>
         </div>
         <div className="medium-6 columns center">
         <input type="text" ref="password" placeholder="Enter password here"/>
         <p className="help-text" id="passwordHelpText">Your password must be at least x characters</p>
         </div>
         <button className="button small-centered text-center columns">Login</button>
       </form>
     </div>
     )
   }
 })

 var Login = React.createClass({
   getDefaultProps:function(){
     return {
       username: '',
       password: ''
     };
   },
   getInitialState:function(){
     return{
       username: this.props.username,
       password: this.props.password
     }
   },
   handleNewLogin: function(username, password){
     this.setState({
       username: username,
       password: password
     })
   },

   render: function () {
     var username = this.state.username;
     var password = this.state.password;
     return (
       <div>
         <h2>Login Page</h2>
         <LoginForm onNewLogin={this.handleNewLogin}/>
       </div>
     );
   }
 });

 module.exports = Login;
