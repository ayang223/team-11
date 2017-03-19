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
      <div >
      {this.props.children}
    </div>
    </div>
    )
  }
}

module.exports = Main;
