"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;
import PlacesAutocomplete, { geocodeByAddress} from 'react-places-autocomplete';

// Example
  var width = 700;
  var height = 700;
  var scale = 100000 * 5;
  var scaleExtent = [1 << 12, 1 << 13]
  var center = [-123.1022025, 49.2823492];
  var mapData = {
          "type": "Feature",
          "properties": {
            "text": "this is a Point!!!"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [0, 0]
          }
      }
var popupContent = function(d) { return 'hi, i am polygon'; }

var onPolygonClick= function(e, d, i) {
    e.showPopup();
  }
var onPolygonCloseClick= function(e, id) {
    e.hidePopup();
  }
var D3Map = React.createClass({
  createPostalCodes: function(data){
    var _this = mapData;
    var locations = data.Location;
    var postalCodes = [];
    var apiCallResult;
    var latLong = [];
    for(var i = 0; i< locations.length; i++){
      postalCodes.push(locations[i].postal)
    }
    //console.log(postalCodes);
    geocodeByAddress("V6E 2X5", (err, result) => {
      if(err){
        console.log(err);
      }
      console.log(result);
      _this.geometry.coordinates = [result.lng, result.lat];
    });
  },
  render() {
    var dataFromDash = this.props.data;
    var postalCodes = this.createPostalCodes(dataFromDash);
    return (
      <div className="row">
        <h2>Map Example</h2>
      <Map
        width= {width}
        height= {height}
        scale= {scale}
        scaleExtent= {scaleExtent}
        center= {center}
      >
        <MarkerGroup
          key= {"polygon-test"}
          data= {mapData}
          popupContent= {popupContent}
          onClick= {onPolygonClick}
          onCloseClick= {onPolygonCloseClick}
          markerClass= {"your-marker-css-class"}
        />
      </Map>
    </div>
  );
  }
});
module.exports = D3Map;
