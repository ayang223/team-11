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
         <Link to="/">Home</Link>
         <Link to="/login">Login</Link>
         <Link to="/account">Account</Link>
       </div>
     );
   }
 });

 module.exports = Nav;
