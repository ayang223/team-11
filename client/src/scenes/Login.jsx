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
       this.refs.username.value = '';
       this.refs.password.value = '';
       this.props.onNewLogin(username,password);
     }
   },
   render: function(){
     return (
       <form onFormSubmit={this.onFormSubmit}>
         <input type="text" ref="username"/>
         <input type="text" ref="password"/>
         <button className="button">Login</button>
       </form>
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
