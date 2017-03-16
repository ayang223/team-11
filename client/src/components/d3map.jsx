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
  var scaleExtent = [1 << 12, 1 << 30]
  var center = [-123.1022025, 49.2823492];
  var mapData = {
          "type": "Feature",
          "properties": {
            "text": "this is a Point!!!"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [[-123.1009434, 49.2826161], [-122.98590580000001, 49.2300456]]
          }
      }
 var data = {
   'geometry':
   {
     coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]],
     type: "Point"
    },
    id: 999999, properties:
    {
      "text": "hi, this is a polygon!"
    }, type: "Feature"};

var popupContent = function(d) { return 'hi, i am polygon'; }

var onPolygonClick= function(e, d, i) {
    e.showPopup();
  }
var onPolygonCloseClick= function(e, id) {
    e.hidePopup();
  }
var counter = 0;
var latLong = [];
var D3Map = React.createClass({
  doTimeout : function(ps, n){
    var _this = mapData;
    setTimeout(function(){
        geocodeByAddress(ps, (err, result) => {
          if(err){
            console.log(err);
          }else{
            //console.log("lng: " +result.lng);
            //console.log("lat: " +result.lat);
            latLong.push([result.lng, result.lat]);
            _this.geometry.coordinates.push(latLong[n]);
            console.log( _this.geometry.coordinates)
            //return result;
            //console.log(result);
            //console.log(latLong);
          }
        });
      }, 1000 * n);
  },
  createPostalCodes: function(data){
    var _this = mapData;
    var locations = data.Location;
    var postalCodes = [];
    var apiCallResult;
    var latLong = [];
    for(var i = 0; i< locations.length; i++){
      postalCodes.push(locations[i].postal)
    }
    console.log(postalCodes);
    for(var i = 0; i < postalCodes.length; i++){
      //this.doTimeout(postalCodes[i], i);
      }
      //_this.geometry.coordinates = [result.lng, result.lat];
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
