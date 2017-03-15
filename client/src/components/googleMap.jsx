var React, {PropTypes, Component} = require('react-addons-{addon}')
var GoogleMap = require('google-map-react');

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class googleMap extends React.Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number
  };
  static defaultProps = {
      center: [59.938043, 30.337157],
      zoom: 9
    };

    constructor(props) {
      super(props);
    }
  render() {
    return (
      <GoogleMap
        //apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}>
      >
    </GoogleMap>
    );
  }
}

module.exports = googleMap;
