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
        return (
            <div className="row">
                <form onSubmit={this.onFormSubmit}>
                    <p style={{margin:"10px"}}>
                        Username :
                    </p>
                    <div className="medium-6 columns center">
                        <input type="text" ref="username" placeholder="Enter username here"/>
                    </div><br/><br/><br/>
                    <div className="medium-6 columns center">
                        <p>
                            Password:
                        </p>
                        <input type="password" ref="password" placeholder="Enter password here"/>
                        <p className="help-text" id="passwordHelpText">If you don't have an account, speak to an Administrator to set up one</p>
                    </div>
                    <button className="button small-centered text-center columns">Login</button>
                </form>
            </div>
        );
    }
});

module.exports = LoginForm;
