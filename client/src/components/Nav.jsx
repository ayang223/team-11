/**
 * Created by nathan on 21/01/17.
 */
 var React = require('react');
 var {Link} = require('react-router');
 import cookie from 'react-cookie';



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
   render: function () {
     checkLogin();
     return (
         <div className="top-bar">
           <div className="top-bar-left">
             <ul className="menu">
             <li className="menu-text">United Way</li>
              <li>
                <Link to="/import" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Import</Link>
              </li>
              <li>
                <Link to="/dashboard" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</Link>
              </li>
             </ul>
           </div>
           <div className="top-bar-right">
             <ul className="menu">
                 {isLoggedIn?
                   <div className="top-bar-right">
                     <ul className="menu">
                       {isAdmin?
                         <li>
                         <Link to="/adminpage" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Admin Account</Link>
                       </li>
                     :
                     <li>
                    <Link to="/account" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Account</Link>
                    </li>
                   }
                      <li>
                      <Link to="/logout" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                     :
                     <div className="top-bar-right">
                       <ul className="menu">
                         <li>
                       <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
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
