import sha256 from 'js-sha256';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Table, Column, Cell} from 'fixed-data-table';
var React = require('react');
var TableExample = require('TableExample');
var TableAdmin = require('TableAdmin');
var TableLogEvents = require('TableLogEvents');
var url = require('url');


var AccountForm = React.createClass({
  createNewAccount:function(e){
    e.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var verifypassword = this.refs.verifypassword.value;
    var fname = this.refs.fname.value;
    var lname = this.refs.lname.value;

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
        "admin_privileges" : false  // admin privilege default to false
      }),
      success:function(data){
        if(data.status === "failed"){
          alert("Failed to create new User");
        }else{
          alert("Success! New User has been created");
        }
        console.log(data)
      }.bind(this),
      error:function(error){
        console.log(error);
      }
    })
  },

  render: function(){
    return(
      <div style={{
        width:1100,
        height:400,
        margin:20,
        paddingLeft:130,
        paddingRight:120}}>
      <form onFormAccount={this.onFormAccount}>
        <div className="row">
        <div className="medium-15 columns">
        <h3> Create new account </h3>
        <label> Username </label>
        <input type="text" ref="username" placeholder="Please enter username. "/>
        </div>
        </div>
        <div className="row">
        <div className="medium-15 columns">
        <label> Password </label>
        <input type="password" ref ="password" placeholder="Please enter password." />
        </div>
        </div>
        <div className="row">
        <div className="medium-15 columns">
        <label> Verify password </label>
        <input type="password" ref ="verifypassword" placeholder="Please re-enter password." />
        </div>
        </div>
        <div className="row">
        <div className="medium-15 columns">
        <label> First name </label>
        <input type="text" ref ="fname" placeholder="Please enter first name." />
        </div>
        </div>
        <div className="row">
        <div className="medium-15 columns">
        <label> Last name </label>
        <input type="text" ref ="lname" placeholder="Please enter last name." />
        </div>
        </div>
        <div className="row">
        <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40, float:"right"}} onClick={this.createNewAccount}>Create account</button>
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
        "user" : username
      }),
      success:function(data){
        console.log(data);
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
      error:function(error){
        console.log(error);
        alert("User delete failed");
      }
    })
  },

  render:function(){
    return(
      <div style={{width:1100,height:300,margin:30,paddingLeft:130,paddingRight:120}}>

      <form onDeleteUserForm={this.onDeleteUserForm}>
        <div className="row">
        <div className="medium-15 columns">
          <h3> Delete an User </h3>
        <label> Username </label>
        <input type="text" ref="username" placeholder="Please enter username. "/>
        </div>
        </div>
         <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40,float:"right"}} onClick={this.deleteUser}>Delete user</button>
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
      data: ''
    };

  },

  componentWillMount:function() {
    var _this = this;
    console.log("compnenet will mount")
    var getUsers = $.ajax({
      url:url,
      type: "POST",
      data: JSON.stringify({
        "action" : "List User"
      }),
      dataType:"json",
      success:function(data){
        console.log(data)
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
            console.log(error);
          }
        });
      }.bind(this),
      error:function(error){
        console.log(error);
      }
    });
  },

  componentDidMount:function() {
    console.log("Component did mount")
  },

  handleNewAccount:function(username, password, verifypassword, fname, lname){
    this.setState({
      username:username,
      password:password,
      verifypassword:verifypassword,
      fname:fname,
      lname:lname
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
        console.log(error);
      }
    });
  },

  render:function(){
    var innerStyle = {
      width:"1260px",
      height:"1200px",
      padding: 50,
      margin: 7,
      backgroundColor: "#D9DAE3",
      color: "#474747",
      display: "inline-block",
      fontFamily: "sans-serif",
      fontSize: "18",
    };
    var outerStyle ={
      paddingLeft:240,
      paddingRight:100,
    };
    return(
        <div style={innerStyle}>
          <h2 style={{margin:"10px", textAlign: "center"}} >Admin Page</h2>
            <div style={{paddingLeft:130,paddingRight:120}}>
                <h3>User lists </h3>
                <TableAdmin data={this.state.data} />
                <br/>
                <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40, float:"right"}} onClick={this.refreshList}>Refresh List</button>
                </div>
                <div style={{textAlign:"left"}}>
                  <AccountForm onNewAccount={this.handleNewAccount}/>
                  <DeleteUserForm onDeleteUser={this.handleDeleteUser}/>
                </div>
        </div>

    //  <div className="row">
    //    <h2 style={{margin:"20px", textAlign: "center"}} >Admin Page</h2>
    //    <div style={{divStyle}}>
    //    <h2>User lists </h2>
    //    <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40}} onClick={this.refreshList}>Refresh List</button>
    //    <TableAdmin data={this.state.data} />
    //    </div>
    //    <div>
    //    <AccountForm onNewAccount={this.handleNewAccount}/>
    //    </div>
    //    <div>
    //    <DeleteUserForm onDeleteUser={this.handleDeleteUser}/>
    //    </div>
    //    <div>
    //    <h2>Recent actions: </h2>
    //    <TableLogEvents data={this.state.dataLogEvents} />
    //    </div>
    //  </div>
      )
  }
});


module.exports = AdminPage;
