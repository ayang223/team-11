var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Login = require('Login');
var Account = require('Account');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="/login" component={Login}/>
      <Route path="/account" component={Account}/>
      <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
