import React from 'react';

var LoginForm = React.createClass({
    onFormSubmit: function(e) {
        e.preventDefault();

        var username = this.refs.username.value;
        var password = this.refs.password.value;
        if (username.length > 0 && password.length > 0) {
            this.refs.username.value = '';
            this.refs.password.value = '';
            this.props.onNewName(username, password);
        }else{
          alert("error in input");
        }
    },
    render: function() {
      var innerStyle = {
        width:"500px",
        height:"400px",
        padding: 50,
        margin: 7,
        backgroundColor: "#D9DAE3",
        color: "#474747",
        display: "inline-block",
        fontFamily: "sans-serif",
        fontSize: "20",
        textAlign: "left",
        msTransition: 'all',
        boxShadow: "10px 10px 5px #888888"
      };
      var outerStyle ={
        paddingLeft:100,
        paddingRight:100,
      }
        return (
          <div style={outerStyle}>
            <div style={innerStyle}>
                <h4 style={{marginBottom : "10px"}}></h4>
                <form onSubmit={this.onFormSubmit}>
                    <p style={{marginBottom:"10px"}}>
                        Username
                    </p>
                    <div >
                        <input type="text" ref="username" placeholder="Enter username here"/>
                    </div>
                    <div >
                        <p style={{marginBottom:"15px"}}>Password
                        </p>
                        <input type="password" ref="password" placeholder="Enter password here"/>
                        <p className="help-text" id="passwordHelpText">Forgot your password? Speak to an Administrator to retrieve your password</p>
                    </div>
                    <div style={{fontSize:"15"}}>

                    <button className="button medium-centered " style={{float: "right"}}>Login</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
});

module.exports = LoginForm;
