/**
 * Created by nathan on 21/01/17.
 */
 var React = require('react');
 var {Link} = require('react-router');

 var Nav = React.createClass({
   render: function () {
     return (
       <div>
         <h2>Nav Component</h2>
         <Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</Link>
         <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
         <Link to="/account" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Account</Link>
       </div>
     );
   }
 });

 module.exports = Nav;
