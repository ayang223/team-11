import sha256 from 'js-sha256';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table'
var React = require('react');
var TableExample = require('TableExample');
var TableAdmin = require('TableAdmin');
var TableLogEvents = require('TableLogEvents');
var url = require('url');


var AccountForm = React.createClass({
  getInitialState:function(){
    return{
      username: '',
      password:'',
      verifypassword:'',
      fname:'',
      lname:'',
      username: '',
      data: '',
      isAdmin: 'false'
    };
  },

  handleChange:function(e){
    this.setState({isAdmin: e.target.value})
  },
  createNewAccount:function(e){
    e.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var verifypassword = this.refs.verifypassword.value;
    var fname = this.refs.fname.value;
    var lname = this.refs.lname.value;
    var isAdmin = this.state.isAdmin;
    if(username.length > 0 && password.length > 0 && verifypassword.length > 0 && fname.length > 0 && lname.length >0){
      this.refs.username.value = '';
      this.refs.password.value = '';
      this.refs.verifypassword.value = '';
      this.refs.fname.value = '';
      this.refs.lname.value = '';
      this.props.onNewAccount(username,password,verifypassword,fname,lname);
    }else{ alert("error in input");
    return
  }

  if(password.length != verifypassword.length || password != verifypassword){
    alert("passwords do not match");
    return
  }
  var encryptedPassword = sha256(password);

    $.ajax({
      url: url,
      type:"POST",
      data: JSON.stringify({
        "action" : "Create User",
        "user" : username,
        "password" : encryptedPassword,
        "first_name" : fname,
        "last_name" : lname,
        "admin_privileges" : isAdmin  // admin privilege default to false
      }),
      success:function(data){
        if(data.status === "failed"){
          alert("Failed to create new User");
        }else{
          alert("Success! New User has been created");
        }
      }.bind(this),
      error:function(error){
      }
    })
  },


  render: function(){
    return(
      <div className="medium-6 columns">
      <h4> Create new account </h4><hr />
      <form onFormAccount={this.onFormAccount}>
        <div className="row">
        <div className="medium-6 columns">
        <p> Username: </p>
        <input type="text" ref="username" placeholder="Please enter username. "/>
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <p> Password: </p>
        <input type="password" ref ="password" placeholder="Please enter password." />
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <p> Verify password: </p>
        <input type="password" ref ="verifypassword" placeholder="Please re-enter password." />
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <p> First name: </p>
        <input type="text" ref ="fname" placeholder="Please enter first name." />
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <p> Last name: </p>
        <input type="text" ref ="lname" placeholder="Please enter last name." />
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <p> Admin Privileges: </p>
        <select value ={this.state.isAdmin} onChange={this.handleChange}>
          <option ref = "isAdmin" value = "false">False </option>
          <option ref = "isAdmin" value = "true">True </option>
        </select>
        </div>
        </div>
        <div className="row">
        <div className="medium-6 columns">
        <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40}} onClick={this.createNewAccount}>Create account</button>
        </div>
        </div>
      </form>
      </div>
      )
  }

})

var DeleteUserForm = React.createClass({

  deleteUser:function(e){
    e.preventDefault();

    var username = this.refs.username.value;
    var lowerUserName = username.toLowerCase();
    var isProtected = false;

    if(lowerUserName == "main_admin"){
      isProtected = true;
    }

    if(username.length > 0){
       this.props.onDeleteUser(username)
    } else{
      alert("no user entered");
      return
    }

    $.ajax({
      url:url,
      type: "POST",
      data: JSON.stringify({
        "action": "Delete User",
        "user" : lowerUserName,
        "deletion_protected" : isProtected
      }),
      success:function(data){
         (data);
        if (data.status === "failed") {
          if (lowerUserName == "main_admin") {
            alert("User cannot be deleted");
          } else {
            alert("User not found");
          }
        } else {
          alert("User deleted");
        }
      }.bind(this),
      error:function(error){
         (error);
        alert("User delete failed");
      }
    })
  },

  render:function(){
    return(
      <div className="medium-6 columns">
      <h4> Delete a User  </h4><hr />
      <form onDeleteUserForm={this.onDeleteUserForm}>
        <div className="row">
        <div className="medium-6 columns">
        <p> Username: </p>
        <input type="text" ref="username" placeholder="Please enter username. "/>
        </div>
        </div>
         <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40}} onClick={this.deleteUser}>Delete user</button>
      </form>
      </div>
      )
  }
})

var AdminPage = React.createClass({

  getInitialState() {

    return{
      username: '',
      password:'',
      verifypassword:'',
      fname:'',
      lname:'',
      username: '',
      data: '',
      isAdmin: 'False'
    };

  },

  componentWillMount:function() {
    var _this = this;
    var getUsers = $.ajax({
      url:url,
      type: "POST",
      data: JSON.stringify({
        "action" : "List User"
      }),
      dataType:"json",
      success:function(data){
        var getLogEvents = $.ajax({
          url: url,
          type: "POST",
          data: JSON.stringify({
            "action" : "List Logs"
          }),
          dataType: "json",
          success: function(dataLogEvents) {
            this.setState({
              data: data,
              dataLogEvents: dataLogEvents
            })
          }.bind(this),
          error: function (error){
          }
        });
      }.bind(this),
      error:function(error){
      }
    });
  },

  componentDidMount:function() {
  },

  handleNewAccount:function(username, password, verifypassword, fname, lname, isAdmin){
    this.setState({
      username:username,
      password:password,
      verifypassword:verifypassword,
      fname:fname,
      lname:lname,
      isAdmin:isAdmin
    });
  },

  handleDeleteUser:function(username){
    this.setState({
      username:username
    });
  },

  refreshList: function() {
    var getUsers = $.ajax({
      url:url,
      type: "POST",
      data: JSON.stringify({
        "action" : "List User"
      }),
      dataType:"json",
      success:function(data){
        this.setState({
          data: data
        })
      }.bind(this),
      error:function(error){
      }
    });
  },

  clearDatabase: function() {
    if(window.confirm("Do you really want to clear the whole database?")){
    $.ajax({
      url:url,
      type: "POST",
      data: JSON.stringify({
        "action" : "Clear Database"
      }),
      dataType:"json",
      success:function(data){
        console.log(data);
        if(data.status == "failed"){
          alert("Failed to clear database");
        } else {
          alert("Success! Database has been cleared");
        }
      }.bind(this),
      error:function(error){
        alert("Failed to clear database");
      }
    })
  }
  },

  render:function(){
    return(
     <div className="row">
       <h2 style={{margin:"20px", textAlign: "center"}} >Admin Page</h2> <hr />
       <div className="row" style={{padding : "50px"}}>
       <h4>List of users: </h4><hr />
       <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40}} onClick={this.refreshList}>Refresh List</button>
       <TableAdmin data={this.state.data} />
       </div>
       <div className="row" style={{padding : "50px"}}>
       <AccountForm onNewAccount={this.handleNewAccount}/>
       <DeleteUserForm onDeleteUser={this.handleDeleteUser}/>
       </div>
       <div className="row" style={{padding: "50px"}}>
       <h4>Recent actions: </h4> <hr />
       <TableLogEvents data={this.state.dataLogEvents} />
       </div>
       <div className="row" style={{padding : "50px"}}>
       <h4>Manage database: </h4><hr />
       <button className="button small-centered text-center coloumns alert" type="submit" style={{width:150, height:40}} onClick={this.clearDatabase}>Clear Database</button>
       </div>
     </div>
      )
  }
});


module.exports = AdminPage;
