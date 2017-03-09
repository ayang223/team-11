import sha256 from 'js-sha256';
var React = require('react');

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
      url:"http://localhost:8080/BackendServer/DatabaseServlet",
      type:"POST",
      data: JSON.stringify({
        "action" : "Create User",
        "username" : username,
        "password" : encryptedPassword,
        "first_name" : fname,
        "last_name" : lname,
        "admin_privileges" : false  // admin privilege default to false
      }),
      success:function(data){
        console.log(data)
      }.bind(this),
      error:function(error){
        console.log(error);
      }
    })
  },

  render: function(){
    return(
      <div className="row">
      <h2> Create new account </h2>
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
        <button className="button small-centered text-center coloumns" type="submit" style={{width:150, height:40}} onClick={this.createNewAccount}>Create account</button>
        </div>
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
    };
    
  },
componentWillMount:function() {
  console.log("compnenet will mounth")
  var getUsers = $.ajax({
    url:"http://localhost:8080/BackendServer/DatabaseServlet",
    type: "POST",
    data: JSON.stringify({
      "action" : "List User"
      }),
    dataType:"json",
    success:function(data){
      console.log(data)
      document.getElementById('out').innerHTML = JSON.stringify(data);
      }.bind(this),
      error:function(error){
        document.getElementById('out').innerHTML = error;
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
      lname,lname
    })
  },

  render:function(){
    return(
     <div>
       <h2>Admin Page</h2>
       <h2>List of users: </h2>
       <p>{this.getUsers}</p>
       <div id="out">
       </div>
       <div>
       <AccountForm onNewAccount={this.handleNewAccount}/>
       </div>
     </div>
      )
  }
});


module.exports = AdminPage;
