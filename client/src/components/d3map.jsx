var React = require('react');
var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;

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
var width = 700;
var height = 700;
// set your zoom scale
var scale = 1200 * 5;
// min and max of your zoom scale
var scaleExtent = [1 << 12, 1 << 13]
// set your center point
var center = [122, 23.5];
// set your popupContent
var popupContent = function(d) { return d.properties.text; }

var d3map = React.createClass({

    render() {
        return (
            <div>
                <Map width={width} height={height} scale={scale} scaleExtent={scaleExtent} center={center}>
                    <MarkerGroup key={"polygon-test"} data={data} popupContent={popupContent} markerClass={"your-marker-css-class"}/>
                </Map>
            </div>
        )
    }
})

module.exports = d3map;
