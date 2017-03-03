var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, RouterContext} = require('react-router');
var Main = require('Main');
var Login = require('Login');
var Account = require('Account');
var Import = require('Import');
var Dashboard = require('Dashboard');
var Test = require('src/scenes/Test.jsx');
import cookie from 'react-cookie';
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

function validateSession(nextState, replace, callback) {
    if (typeof cookie.load('userID') === "undefined") {
        hashHistory.push('/login');
        console.log("blocked");
    }else{
      console.log("validated");
      callback();
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
    <Route path="/" component={Main}>
        <Route path="/login" component={Login}/>
        <Route path="/account" onEnter={validateSession} component={Account} />
        <Route path="/import"  onEnter={validateSession} component={Import} />
        <Route path="/dashboard"  onEnter={validateSession} component={Dashboard}/>
        <Route path="/test" component={Test}/>
        <IndexRoute component={Login}/>
    </Route>
</Router>, document.getElementById('app'));
