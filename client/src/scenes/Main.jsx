var React = require('react');
var Nav = require('Nav');

class Main extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      <Nav />
      <div className="small-11 small-centered columns">
      {this.props.children}
    </div>
    </div>
    )
  }
}

module.exports = Main;
