var React = require('react');

var AccountForm = React.createClass({
  onFormSubmit: function(e){
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
    }
  },

  render: function(){
    return(
      <div className="row">
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
        <div classNAme="row">
        <button className="button small0centered text-center coloumns" type="submit" style={{width:150, height:40}}>Create account</button>
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

  getUsers:function(){
    $.ajax({
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
       <input type="button" ref="button" value="Get Users" onClick={this.getUsers} />
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
