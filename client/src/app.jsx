var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, RouterContext} = require('react-router');
var Main = require('Main');
var Login = require('Login');
var Account = require('Account');
var Import = require('Import');
var Dashboard = require('Dashboard');
var Logout = require('src/components/Logout.jsx')
var AdminPage = require('src/scenes/AdminPage.jsx')
import cookie from 'react-cookie';
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

function validateSession(nextState, replace, callback) {
    if (typeof cookie.load('userID') === "undefined") {
        window.alert("Please Login first");
        hashHistory.push('/login');
    }else{
      callback();
    }
}
function validateSessionAdmin(nextState, replace, callback) {
    if (typeof cookie.load('userID') === "undefined" || cookie.load('admin') === 'false') {
        window.alert("Only Admins can import");
        hashHistory.push('/dashboard');
    }else{
      callback();
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
    <Route path="/" component={Main}>
        <Route path="/login" component={Login}/>
        <Route path="/account" onEnter={validateSession} component={Account} />
        <Route path="/import"  onEnter={validateSessionAdmin} component={Import} />
        <Route path="/dashboard"  onEnter={validateSession} component={Dashboard}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/adminpage" component={AdminPage}/>
        <IndexRoute component={Login}/>
    </Route>
</Router>, document.getElementById('app'));
