import React, { Component } from 'react';
import logo from './static/logo.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>CPSC 319</h2>
        </div>
        <p className="App-intro">
          Team 11
        </p>
      </div>
    );
  }
}

export default App;
