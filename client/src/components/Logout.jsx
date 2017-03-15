import React from 'react';
import cookie from 'react-cookie';
var {hashHistory} = require('react-router');

class Logout extends React.Component{

  close() {
    alert("Close the modal");
  }

  logoutSess(){
    //var sure = window.confirm("Are you sure?")
    //if(sure){
      cookie.remove('userID', []);
      cookie.remove('admin', []);
      hashHistory.push('/login');
  //  }
  }

  render(){
    return(
  <div >
    <div className="modal fade" id="loginModal" role="dialog" tabIndex="-1" >
      <div className= "modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
               <button type="button" className="btn btn-default" data-dismiss="modal"  aria-hidden="true" onClick={this.close}>&times;</button>
              <h3 className="modal-title"> Logout </h3>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="alert button" onClick={this.logoutSess}>Confirm</button>
                <button type="button" className="button large-centered text-center coloumns" data-dismiss="modal"  aria-label="Close" onClick={this.close}>Close</button>

                </div>
          </div>
            </div>
          </div>
        </div>
      </div>

  )
  }
}

module.exports = Logout;
