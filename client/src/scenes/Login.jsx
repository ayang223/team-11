// /**
//  * Created by nathan on 21/01/17.
//  */
import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';

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
  handleNewName: function (u, p) {
    this.setState({
      username: u,
      password: p
    });
    //ajax call
  },
  render: function () {
    var username = this.state.username;
    var password = this.state.password;
    return (
      <div>
        <LoginForm onNewName={this.handleNewName}/>
        <h1> Hello {username}</h1>
        <h2> This is your password: {password}</h2>
      </div>
    );
  }
});

module.exports = Login;
