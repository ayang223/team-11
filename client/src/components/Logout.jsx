import React from 'react';
import cookie from 'react-cookie';
var {hashHistory} = require('react-router');

class Logout extends React.Component{
  logoutSess(){
    var sure = window.confirm("Are you sure?")
    if(sure){
      cookie.remove('userID', []);
      cookie.remove('admin', []);
      hashHistory.push('/login');
    }
  }
  render(){
    return(
    <div>
      <h2>Logout Page</h2>
      <button type="button" className="alert button" onClick={this.logoutSess}>Logout</button>
    </div>
  )
  }
}

module.exports = Logout;
