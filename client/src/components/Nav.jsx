/**
 * Created by nathan on 21/01/17.
 */
 var React = require('react');
 var {Link} = require('react-router');
 import cookie from 'react-cookie';
 var logo = 'src/css/unitedWay.png';
 var {hashHistory} = require('react-router');



var navStyle ={
  backgroundColor: "DimGrey",
  textAlign: "center"
}
var eachItem ={
  backgroundColor : "DimGrey",
  color: "White"
}

var activeItem =  {
  color: 'Black', fontWeight: 'bold'
}


var isLoggedIn = true;
var isAdmin = true;
 function checkLogin(){
   if(typeof cookie.load('userID') === "undefined"){
     isLoggedIn=false;
   }else{
     isLoggedIn=true;
   }
   if(cookie.load('admin') === 'true'){
     isAdmin = true;
   }
   else {
     isAdmin=false;
   }
 }

 var Nav = React.createClass({
   logoutSess(){
     var sure = window.confirm("Are you sure?");
     if(sure){
       cookie.remove('userID', []);
       cookie.remove('admin', []);
       hashHistory.push('/login');
     }
   },
   render: function () {
     checkLogin();

     return (
         <div className="top-bar" style={navStyle}>
           <div className="top-bar-left">
             <ul className="menu" style={eachItem}>
             <li className="menu-text">Andar Data Analytics</li>
              <li>
                  <Link  style={eachItem} to="/import" activeClassName="active" activeStyle={activeItem}>Import</Link>
              </li>
              <li>
                <Link  style={eachItem} to="/dashboard" activeClassName="active" activeStyle={activeItem}>Dashboard</Link>
              </li>
             </ul>
           </div>
           <div className="top-bar-right" >
             <ul className="menu" style={eachItem}>
                 {isLoggedIn?
                   <div className="top-bar-right">
                     <ul className="menu"  style={eachItem}>
                       {isAdmin?
                         <li>
                         <Link style={eachItem} to="/adminpage" activeClassName="active" activeStyle={activeItem}>Admin Account</Link>
                       </li>
                     :
                     <li>
                    <Link style={eachItem} to="/account" activeClassName="active" activeStyle={activeItem}>Account</Link>
                    </li>
                   }
                      <li>
                      <button style={eachItem} activeClassName="active" activeStyle={activeItem} onClick={this.logoutSess}>Logout</button>
                      </li>
                    </ul>
                  </div>
                     :
                     <div className="top-bar-right">
                       <ul className="menu" style={eachItem}>
                         <li>
                       <Link style={eachItem} to="/login" activeClassName="active" activeStyle={activeItem}>Login</Link>
                       </li>
                     </ul>
                   </div>
                   }
             </ul>
           </div>
         </div>
     );
   }
 });

 module.exports = Nav;
