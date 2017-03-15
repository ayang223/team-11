"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;
import PlacesAutocomplete, { geocodeByAddress} from 'react-places-autocomplete';
var ZoomControl = require('react-d3-map-core').ZoomControl;

// Example
  var width = 700;
  var height = 700;
  var scale = (1 << 18);
  var scaleExtent = [1 << 12, 1 << 13]
  var center = [-123.1022025, 49.2823492];
  var t = {
    "type" : "Topology",
    "objects" : {
      "places" : {
        "type" : "GeometryCollection",
        "geometries": [
          {
            "type" : "Point",

            "coordinates" : [-122.94726830000002, 49.2310876],
            "properties" : {
              "name": "Aberdeen"
            }
          },
          {
            "type" : "Point",
            "coordinates" : [-123.1302129, 49.2844627],
            "properties" : {
              "name" : "Ayr"
            }
          }
        ]
      }
    }
  }
  var mapData = topojson.feature(t, t.objects.places);

  var x = {
          "type": "Feature",
          "properties": {
            "text": "this is a Point!!!"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [0, 0]
          }
      }
var popupContent = function(d) { return d.properties.name }

var onPolygonClick= function(e, d, i) {
    e.showPopup();
  }
var onPolygonCloseClick= function(e, id) {
    e.hidePopup();
  }
var D3Map = React.createClass({
  getInitialState: function() {
      return {
        scale: scale
      }
    },
    zoomOut: function() {
      this.setState({
        scale: this.state.scale / 2
      })
    },
    zoomIn: function() {
      this.setState({
        scale: this.state.scale * 2
      })
    },
  createPostalCodes: function(data){
    var _this = mapData;
    console.log(_this);
    var locations = data.Location;
    var postalCodes = [];
    var apiCallResult;
    var latLong = [];
    for(var i = 0; i< locations.length; i++){
      postalCodes.push(locations[i].postal)
    }
    //console.log(postalCodes);
    geocodeByAddress(postalCodes[6], (err, result) => {
      if(err){
        console.log(err);
      }
      console.log(result);
      //_this.geometry.coordinates = [result.lng, result.lat];
    });
  },
  render() {
    var dataFromDash = this.props.data;
    var postalCodes = this.createPostalCodes(dataFromDash);

    var zoomIn = this.zoomIn;
    var zoomOut = this.zoomOut;
    var styleContainer = {
       position: 'relative',
       backgroundColor: '#EEE',
       width: this.width,
       height: this.height
     }

    return (

      <div className="row" stlye={styleContainer}>
        <h2>Map Example</h2>
      <Map
        width= {width}
        height= {height}
        scale= {scale}
        zoomScale = {this.state.scale}
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
        <ZoomControl
              zoomInClick= {zoomIn}
              zoomOutClick= {zoomOut}
            />
      </Map>

    </div>
  );
  }
});
module.exports = D3Map;
