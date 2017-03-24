var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var LoginForm = require('LoginForm');

describe('LoginForm', () =>{
  it('valid credentials in Login Form', ()=>{
    var spy = expect.createSpy();
    var loginForm = TestUtils.renderIntoDocument(<LoginForm onNewName={spy}/>);
    var $el = $(ReactDOM.findDOMNode(loginForm));

    loginForm.refs.username.value = "username1";
    loginForm.refs.password.value = "password1";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith("username1", "password1");
  });
  it('Blank username and password entered into LoginForm', ()=>{
    var spy = expect.createSpy();
    var loginForm = TestUtils.renderIntoDocument(<LoginForm onNewName={spy}/>);
    var $el = $(ReactDOM.findDOMNode(loginForm));

    loginForm.refs.username.value = "";
    loginForm.refs.password.value = "";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
