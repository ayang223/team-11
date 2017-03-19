// /**
//  * Created by nathan on 21/01/17.
//  */
import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import cookie from 'react-cookie';
import sha256 from 'js-sha256';
var {hashHistory} = require('react-router');
var url = require('url');

var divStyle={
  padding: "10%"
}

var h1style={
  align: "center",
  margin: "20px",
  padding: "10px",
  textAlign: "center"
}

var Login = React.createClass({
  getDefaultProps: function () {
    return {
      username: '',
      password: ''
    };
  },
  getInitialState: function () {
    return {
        username: this.props.username,
        password: this.props.password
    };
  },
  saveCookie : function(username, data) {
    cookie.save('userID', username, {path: '/', maxAge:7200 }); // expires in two hours
    if(data.admin === true){
      cookie.save('admin', true, {path:'/', maxAge:7200});
    }else{
      cookie.save('admin', false, {path:'/', maxAge:7200});
    }
  },
  handleNewName: function (u, p) {
    this.setState({
      username: u,
      password: p
    });
    var loginUsername = u;
    var loginPass = sha256(p);
    //ajax call
        $.ajax({
            url:url,
           type: "POST",
           data: JSON.stringify({
             "action" : "Login User",
             "user": loginUsername,
             "password": loginPass
           }),
            dataType:"json",
            success:function(data){
               if(data.status === "success"){
                 //set SessionToken to hold JWT
                 this.saveCookie(loginUsername, data);
                 window.alert("Successfully logged in");
                 hashHistory.push('/dashboard');
               }else{
                 window.alert("Failed to login, please check your username or passsword");
               }
            }.bind(this),
        });
  },

  getUser:function(){
    return{
      username
    };
  },

  render: function () {
    var username = this.state.username;
    var password = this.state.password;
    return (
      <div>
      <div className="centered" style={divStyle}>
      <h2 style={h1style}>Welcome! Please login to continue </h2>
    
        <LoginForm onNewName={this.handleNewName}/>
      </div>
    </div>
    );
  }
});


module.exports = Login;
