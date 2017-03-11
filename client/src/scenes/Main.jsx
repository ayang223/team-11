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
      {this.props.children}
    </div>
    )
  }
}

module.exports = Main;
