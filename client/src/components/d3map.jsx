"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;

// Example
  var width = 700;
  var height = 700;
  var scale = 1200 * 5;
  var scaleExtent = [1 << 12, 1 << 13]
  var center = [122, 23.5];
  var data = {
          "type": "Feature",
          "properties": {
            "text": "this is a Point!!!"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [122, 23.5]
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
  render() {
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
          data= {data}
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
