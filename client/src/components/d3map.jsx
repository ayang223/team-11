"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;
import PlacesAutocomplete, { geocodeByAddress} from 'react-places-autocomplete';
var ZoomControl = require('react-d3-map-core').ZoomControl;

<<<<<<< HEAD
// Example
  var width = 890;
  var height = 500;
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
=======
var width = 1000;
var height = 500;
var scaleExtent = [1 << 12, 1 << 30]
var scale = 100000 * 5;
var center = [-123.1022025, 49.2823492];
var rawJson ={
  "type": "Topology",
  "objects" : {
    "places" : {
      "type" : "GeometryCollection",
      "geometries" : []
    }
  }
}
var popupContent = function(d) { return d.properties.name }
>>>>>>> 6711e63b7ca81b70ecb5845a5def440230a0e0fc

var onPolygonClick= function(e, d, i) {
    e.showPopup();
  }
var onPolygonCloseClick= function(e, id) {
    e.hidePopup();
  }

var D3Map = React.createClass({
  getInitialState: function(){
    return{
      scale: 100000 * 5,
      mapData: {},
      loading: true
    }
  },
  psToCoor : function(ps, i, name){
    setTimeout(function(){
      geocodeByAddress(ps, (err, result) => {
        if(err){
          console.log(err);
        }else{
          rawJson.objects.places.geometries.push({"type": "Point", "coordinates" : [result.lng, result.lat], "properties" : {"name":name}});
          console.log("Loading Program number: " + i + " to Programs Map");
        }
      })
    }, 1000 * i);
  },
  componentWillMount:function(){
    var _this = this;
    var dashData = this.props.data;
    var topoData;
    for(var i =0; i< 5; i++){
      this.psToCoor(dashData.Location[i].postal, i, dashData.Location[i].name);
    }
    setTimeout(function(){
      topoData = topojson.feature(rawJson, rawJson.objects.places);
      _this.setState({
        mapData : topoData,
        loading: false
      })
    }, 1000 * 5);
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
  render(){
    var zoomIn = this.zoomIn;
    var zoomOut = this.zoomOut;
    var styleContainer = {
       position: 'relative',
       backgroundColor: '#EEE',
       width: this.width,
       height: this.height
     }
     if(this.state.loading){
       return (
         <div>
           <h3>Programs Map is currently loading....</h3>
           </div>)
     }
    return(
      <div className="large-6 column" style={styleContainer}>
        <h2>Programs Map</h2>
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
            data= {this.state.mapData}
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
    )
  }
});

module.exports = D3Map;
