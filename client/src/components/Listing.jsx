var React = require('react');
var topojson = require('topojson');
var Map = require('react-d3-map').Map;
var MarkerGroup = require('react-d3-map').MarkerGroup;
var ZoomControl = require('react-d3-map-core').ZoomControl;

var width = 500;
var height = 300;
var scaleExtent = [
    1 << 12,
    1 << 30
]
var scale = 100000 * 5;

var popupContent = function(d) {
    return d.properties.name
}

var onPolygonClick = function(e, d, i) {
    e.showPopup();
}
var onPolygonCloseClick = function(e, id) {
    e.hidePopup();
}

var Listing = React.createClass({
  getInitialState: function() {
      return {
          scale: 100000 * 5
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

    createListings: function(data) {
        var dataFromDash = data;
        var programList = [];
        var program = {
            "elements": [],
            "locations": [],
            "agency": ""
        };

        for (var i = 0; i < dataFromDash.Program.length; i++) {
            program = dataFromDash.Program[i];
            var locations = [];
            var elements = [];

            for (var j = 0; j < dataFromDash.Location.length; j++) {
              var location = {
                "lat" : 0,
                "lon" : 0
              }
                if (program.id === dataFromDash.Location[j].andar_id) {
                  if(dataFromDash.Location[j].lat !== 0){
                      location.lat = dataFromDash.Location[j].lat,
                      location.lon = dataFromDash.Location[j].lon;
                      locations.push(location); //TODO: Change to Coordinates after Backend Change
                  }
                }
            }
            for (var k = 0; k < dataFromDash.Agency.length; k++) {
                if (dataFromDash.Agency[k].id === program.agency_andar) {
                    program.agency = dataFromDash.Agency[k].name;
                }
            }
            for (var l = 0; l < dataFromDash.ProgramElement.length; l++) {
                if (program.id == dataFromDash.ProgramElement[l].andar_id) {
                    elements.push(dataFromDash.ProgramElement[l].element);
                }
            }
            program.elements = elements;
            program.locations = locations;
            programList.push(program);
        }
        return programList;
    },

    renderListings: function(programList){
      var listOfHi = [];
      var zoomIn = this.zoomIn;
      var zoomOut = this.zoomOut
      var center = [-123.1022025, 49.2823492];
        for(var i = 0; i < programList.length; i++){
          var rawJson = {
              "type": "Topology",
              "objects": {
                  "places": {
                      "type": "GeometryCollection",
                      "geometries": []
                  }
              }
          }
          for(var k =0; k < programList[i].locations.length; k++){
            rawJson.objects.places.geometries.push({
                "type": "Point",
                "coordinates": [
                    programList[i].locations[k].lon, programList[i].locations[k].lat
                ],
                "properties": {
                    "name":   programList[i].name
                }
            });
            center = [programList[i].locations[k].lon, programList[i].locations[k].lat];
          }
          var mapData = topojson.feature(rawJson, rawJson.objects.places);
          var listElements = programList[i].elements.map((element)=>
                <li className="help-text" key={element}>{element}</li>);
          listOfHi.push(
            <div className="row" key={programList[i].id}>
            <div className="large-6 column">
              <h5 style={{marginBottom:"0px"}}><small>Program </small></h5>
              <h5 style={{fontWeight: 'bold'}}>{programList[i].name} </h5>
              <h6 style={{marginBottom:"0px"}}><small>Agency </small></h6>
              <h6 style={{fontWeight: 'bold'}}>{programList[i].agency}</h6>
              <dl>
                <dt>Program Description: </dt>
                <dd>{programList[i].description}</dd>
                  <dt>Program website: </dt>
                  <dd>{programList[i].website}</dd>
                    <dt>Program Elements: </dt>
                    <dd>{listElements}</dd>
              </dl>
              </div>
              <div className="large-6 column">
                <Map width={width} height={height} scale={scale} zoomScale={this.state.scale} scaleExtent={scaleExtent} center={center}>
                    <MarkerGroup key={"polygon-test"} data={mapData} popupContent={popupContent} onClick={onPolygonClick} onCloseClick={onPolygonCloseClick} markerClass={"your-marker-css-class"}/>
                </Map>
                </div>
            </div>
          );
        }
        return listOfHi;
    },

    render: function() {
        var rawJson = {
            "type": "Topology",
            "objects": {
                "places": {
                    "type": "GeometryCollection",
                    "geometries": []
                }
            }
        }
        var dataFromDash = this.props.data;
        var programList = this.createListings(dataFromDash);
        console.log(programList);
        const listPrograms = this.renderListings(programList);

        return (
            <div className="row">
              {listPrograms}
            </div>
        )
    }
})

module.exports = Listing;
