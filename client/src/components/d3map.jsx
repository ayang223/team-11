"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
var ZoomControl = require('react-d3-map-core').ZoomControl;

var width = 500;
var height = 400;
var scaleExtent = [
    1 << 12,
    1 << 30
]
var scale = 100000 * 5;
var center = [-123.1022025, 49.2823492];

var popupContent = function(d) {
    return d.properties.name
}

var onPolygonClick = function(e, d, i) {
    e.showPopup();
}
var onPolygonCloseClick = function(e, id) {
    e.hidePopup();
}

var D3Map = React.createClass({
    getInitialState: function() {
        return {
            scale: 100000 * 5,
            data: this.props.data
        }
    },
    createMaps: function(data) {
      var rawJson = {
          "type": "Topology",
          "objects": {
              "places": {
                  "type": "GeometryCollection",
                  "geometries": []
              }
          }
      }
        var _this = this;
        var dashData = data;
        var topoData;
        for (var i = 0; i < dashData.Location.length; i++) {
            //this.psToCoor(dashData.Location[i].postal, i, dashData.Location[i].name);
            if (dashData.Location[i].lat === 0) {
                //console.log("could not find Program: " + dashData.Location[i].name)
            } else {
                rawJson.objects.places.geometries.push({
                    "type": "Point",
                    "coordinates": [
                        dashData.Location[i].lon, dashData.Location[i].lat
                    ],
                    "properties": {
                        "name": dashData.Location[i].name + " " + "http://www.google.com/maps/place/" + dashData.Location[i].lon.toString() + "," + dashData.Location[i].lat.toString()
                    }
                });
            }
        }
        topoData = topojson.feature(rawJson, rawJson.objects.places);
        return topoData;
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
    render() {
        var mapData = this.createMaps(this.state.data);
        var zoomIn = this.zoomIn;
        var zoomOut = this.zoomOut;
        var styleContainer = {
            position: 'relative',
            width: this.width,
            height: this.height
        }
        if (this.state.loading) {
            return (
                <div>
                    <h3>Programs Map is currently loading....</h3>
                </div>
            )
        }
        return (
            <div className="large-6 column" style={styleContainer}>
                <h4 style={{textAlign: "center"}}>Programs Map</h4><hr />
                <Map width={width} height={height} scale={scale} zoomScale={this.state.scale} scaleExtent={scaleExtent} center={center}>
                    <MarkerGroup key={"polygon-test"} data={mapData} popupContent={popupContent} onClick={onPolygonClick} onCloseClick={onPolygonCloseClick} markerClass={"your-marker-css-class"}/>
                    <ZoomControl zoomInClick={zoomIn} zoomOutClick={zoomOut}/>
                </Map>
            </div>
        )
    }
});

module.exports = D3Map;
