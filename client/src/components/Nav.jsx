/**
 * Created by nathan on 21/01/17.
 */
 var React = require('react');
 var {Link} = require('react-router');

 var Nav = React.createClass({
   render: function () {
     return (
         <div className="top-bar">
           <div className="top-bar-left">
             <ul className="menu">
             <li className="menu-text">United Way</li>
             <li>
               <Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</Link>
              </li>
              <li>
                <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
              </li>
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
               <li>
                 <Link to="/account" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Account</Link>
               </li>
             </ul>
           </div>
         </div>
     );
   }
 });

 module.exports = Nav;
