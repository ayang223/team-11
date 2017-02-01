var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Login = require('Login');
var Account = require('Account');
var Import = require('Import');
var Dashboard = require('Dashboard');
var Test = require('Test');
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="/login" component={Login}/>
      <Route path="/account" component={Account}/>
      <Route path="/import" component={Import}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/test" component={Test}/>
      <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
