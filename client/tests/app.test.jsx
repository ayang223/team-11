var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var LoginForm = require('LoginForm');
var Nav = require('Nav');
var Main = require('Main');
var Login = require('Login');
var Account = require('Account');
var Import = require('Import');
var Dashboard = require('Dashboard');

describe('Regression Testing for Components:', () =>{
  it('Account should exist', () =>{
    expect(Account).toExist();
  })
  it('Import should exist', () =>{
    expect(Import).toExist();
  })
  it('Dashboard should exist', () =>{
    expect(Dashboard).toExist();
  })
  it('Login should exist', () =>{
    expect(Login).toExist();
  })
  it('Main should exist', () =>{
    expect(Main).toExist();
  })
  it('Nav should exist', () =>{
    expect(Nav).toExist();
  })
  it('LoginForm should exist', () =>{
    expect(LoginForm).toExist();
  });
});

describe('LoginForm', () =>{

  it('Should call NewName if valid Username and Password is enter', ()=>{
    var spy = expect.createSpy();
    var loginForm = TestUtils.renderIntoDocument(<LoginForm onNewName={spy}/>);
    var $el = $(ReactDOM.findDOMNode(loginForm));

    loginForm.refs.username.value = "username1";
    loginForm.refs.password.value = "password1";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith("username1", "password1");
  });

  it('Should not call NewName if valid Username and Password is enter', ()=>{
    var spy = expect.createSpy();
    var loginForm = TestUtils.renderIntoDocument(<LoginForm onNewName={spy}/>);
    var $el = $(ReactDOM.findDOMNode(loginForm));

    loginForm.refs.username.value = "";
    loginForm.refs.password.value = "";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });

});
