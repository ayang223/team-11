import sha256 from 'js-sha256';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';
var React = require('react');
var TableExample = require('TableExample');
var TableAdmin = require('TableAdmin');
var TableLogEvents = require('TableLogEvents');
var url = require('url');

var AccountForm = React.createClass({
    createNewAccount: function(e) {
        e.preventDefault();

        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var verifypassword = this.refs.verifypassword.value;
        var fname = this.refs.fname.value;
        var lname = this.refs.lname.value;

        if (username.length > 0 && password.length > 0 && verifypassword.length > 0 && fname.length > 0 && lname.length > 0) {
            this.refs.username.value = '';
            this.refs.password.value = '';
            this.refs.verifypassword.value = '';
            this.refs.fname.value = '';
            this.refs.lname.value = '';
            this.props.onNewAccount(username, password, verifypassword, fname, lname);
        } else {
            alert("error in input");
            return
        }

        if (password.length != verifypassword.length || password != verifypassword) {
            alert("passwords do not match");
            return
        }
        var encryptedPassword = sha256(password);

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({
                "action": "Create User",
                "user": username,
                "password": encryptedPassword,
                "first_name": fname,
                "last_name": lname,
                "admin_privileges": false // admin privilege default to false
            }),
            success: function(data) {
                if (data.status === "failed") {
                    alert("Failed to create new User");
                      //document.getElementById('errorOut').innerHTML = "Failed to create user, contact Administrator for more info"
                } else {
                    alert("Success! New User has been created");
                }
            }.bind(this),
            error: function(error) {
              //document.getElementById('errorOut').innerHTML = "Failed to create user, contact Administrator for more info"
            }
        })
    },

    render: function() {
        return (
            <div className="medium-6 column" style={{}}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  margin: '20px',
                  paddingLeft: '50px',
                  paddingRight: '50px'
                }}>
                    <form onFormAccount={this.onFormAccount}>
                        <div className="row">
                            <div className="medium-15 columns">
                                <h3>
                                    Create new account
                                </h3>
                                  <hr />
                                <label >
                                    Username
                                </label>
                                <input type="text" ref="username" placeholder="Please enter username. "/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-15 columns">
                                <label>
                                    Password
                                </label>
                                <input type="password" ref="password" placeholder="Please enter password."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-15 columns">
                                <label>
                                    Verify password
                                </label>
                                <input type="password" ref="verifypassword" placeholder="Please re-enter password."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-15 columns">
                                <label>
                                    First name
                                </label>
                                <input type="text" ref="fname" placeholder="Please enter first name."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-15 columns">
                                <label>
                                    Last name
                                </label>
                                <input type="text" ref="lname" placeholder="Please enter last name."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="medium-15 columns">
                                <button className="button small-centered text-center coloumns" type="submit" style={{
                                    width: 150,
                                    height: 40,
                                    float: "right"
                                }} onClick={this.createNewAccount}>Create account</button>
                            </div>
                            <div id="errorOut"></div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

})

var DeleteUserForm = React.createClass({

    deleteUser: function(e) {
        e.preventDefault();

        var username = this.refs.username.value;

        if (username.length > 0) {
            this.props.onDeleteUser(username)
        } else {
            alert("no user entered");
            return
        }

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({"action": "Delete User", "user": username}),
            success: function(data) {
                if (data.status === "failed") {
                    if (data.main_admin) {
                        alert("User cannot be deleted");
                    } else {
                        alert("User not found");
                    }
                } else {
                    alert("User deleted");
                }
            }.bind(this),
            error: function(error) {
                alert("User delete failed");
            }
        })
    },

    render: function() {
        return (
            <div className="medium-6 column" style={{}}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    margin: '20px',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                }}>

                    <form onDeleteUserForm={this.onDeleteUserForm}>
                        <div className="row">
                            <div className="medium-15 columns">
                                <h3>
                                    Delete an User
                                </h3>
                                <hr />
                                <label>
                                    Username
                                </label>
                                <input type="text" ref="username" placeholder="Please enter username. "/>
                            </div>
                        </div>
                        <button className="button small-centered text-center coloumns" type="submit" style={{
                            width: 150,
                            height: 40,
                            float: "right"
                        }} onClick={this.deleteUser}>Delete user</button>
                    </form>
                </div>
            </div>
        )
    }
})

var AdminPage = React.createClass({

    getInitialState() {

        return {
            username: '',
            password: '',
            verifypassword: '',
            fname: '',
            lname: '',
            username: '',
            data: ''
        };

    },

    componentWillMount: function() {
        var _this = this;
        var getUsers = $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({"action": "List User"}),
            dataType: "json",
            success: function(data) {
                var getLogEvents = $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({"action": "List Logs"}),
                    dataType: "json",
                    success: function(dataLogEvents) {
                        this.setState({data: data, dataLogEvents: dataLogEvents})
                    }.bind(this),
                    error: function(error) {
                    }
                });
            }.bind(this),
            error: function(error) {
            }
        });
    },

    componentDidMount: function() {
    },

    handleNewAccount: function(username, password, verifypassword, fname, lname) {
        this.setState({username: username, password: password, verifypassword: verifypassword, fname: fname, lname: lname});
    },

    handleDeleteUser: function(username) {
        this.setState({username: username});
    },

    refreshList: function() {
        var getUsers = $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({"action": "List User"}),
            dataType: "json",
            success: function(data) {
                this.setState({data: data})
            }.bind(this),
            error: function(error) {
            }
        });
    },

    render: function() {
        var innerStyle = {
            width: "100%",
            height: "100%",
            padding: 50,
            margin: 7,
            backgroundColor: "#f2f2f2",
            color: "#474747",
            display: "inline-block",
            fontFamily: "sans-serif",
            fontSize: "18"
        };
        var outerStyle = {
            paddingLeft: 240,
            paddingRight: 100
        };
        return (
            <div style={innerStyle}>
                <h2 style={{
                    margin: "10px",
                    textAlign: "center"
                }}>Admin Page</h2>
                <br/><br/>
                <div className="row">
                    <div style={{
                        width: "100%",
                        height: "100%",
                        border: '1px solid Silver',
                        borderWidth: 5,
                        borderHeight: 5
                    }}>
                        <div style={{
                            padding: '50px',
                            textAlign: "left"
                        }}>
                            <h3>User lists
                            </h3>
                            <hr />
                            <TableAdmin data={this.state.data}/>
                            <button className="button small-centered text-center coloumns" type="submit" style={{
                                width: 150,
                                height: 40,
                                float: "right"
                            }} onClick={this.refreshList}>Refresh List</button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                </div>
                <br/>
                <hr />
                <div style={{
                    textAlign: "left"
                }} className="row">
                    <AccountForm onNewAccount={this.handleNewAccount}/>
                    <DeleteUserForm onDeleteUser={this.handleDeleteUser}/><br/><br/>
                </div>
                <hr />
                <div style={{
                    textAlign: "left"
                }} className="row">
                    <div style={{
                        width: "100%",
                        height: "100%",
                        border: '1px solid Silver',
                        borderWidth: 5,
                        borderHeight: 5
                    }}>
                        <div style={{
                            padding: '50px'
                        }}>
                            <h3>Recent actions
                            </h3>
                            <hr />
                            <TableLogEvents data={this.state.dataLogEvents}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
});

module.exports = AdminPage;
