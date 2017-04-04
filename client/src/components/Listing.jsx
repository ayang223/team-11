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
          scale: 100000 * 5,
          data: this.props.data
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
            "agency": "",
            "AndarDataOutput": []
        };

        for (var i = 0; i < dataFromDash.Program.length; i++) {
            program = dataFromDash.Program[i];
            var locations = [];
            var elements = [];
            var andar = [];

            for (var j = 0; j < dataFromDash.Location.length; j++) {
              var location = {
                "name": "",
                "lat" : 0,
                "lon" : 0
              }
                if (program.id === dataFromDash.Location[j].andar_id) {
                  if(dataFromDash.Location[j].lat !== 0){
                      location.lat = dataFromDash.Location[j].lat,
                      location.lon = dataFromDash.Location[j].lon;
                      location.name = dataFromDash.Location[j].name;
                      locations.push(location);
                  }
                }
            }
            for (var k = 0; k < dataFromDash.Agency.length; k++) {
                if (dataFromDash.Agency[k].id === program.agency_andar) {
                    program.agency = dataFromDash.Agency[k].name;
                }
            }
            for (var l = 0; l < dataFromDash.ProgramElement.length; l++) {
                if (program.id == dataFromDash.ProgramElement[l].andar_id &&  dataFromDash.ProgramElement[l].level != 300) {
                    elements.push(dataFromDash.ProgramElement[l].element);
                }
            }
            for(var n = 0; n < dataFromDash.AndarDataOutput.length; n++){
              if(program.id === dataFromDash.AndarDataOutput[n].program_andar){
                andar.push(dataFromDash.AndarDataOutput[n]);
              }
            }
            if(andar.length > 0){
            program.AndarDataOutput = andar;
            program.elements = elements;
            program.locations = locations;
            programList.push(program);
          }
        }
        return programList;
    },

    renderListings: function(programList){
      var listOfHi = [];
      var zoomIn = this.zoomIn;
      var zoomOut = this.zoomOut
      var center = [-123.1022025, 49.2823492];
        for(var i = 0; i < programList.length; i++){
          var mapLinks = [];
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
            var mapLink = {};
            rawJson.objects.places.geometries.push({
                "type": "Point",
                "coordinates": [
                    programList[i].locations[k].lon, programList[i].locations[k].lat
                ],
                "properties": {
                    "name":   programList[i].locations[k].name
                }
            });
            center = [programList[i].locations[k].lon, programList[i].locations[k].lat];
            var isDup = false;
            mapLink.link = "http://www.google.com/maps/place/" + JSON.stringify(programList[i].locations[k].lat) + "," + JSON.stringify(programList[i].locations[k].lon);
            mapLink.name = programList[i].locations[k].name;
            for(var j = 0; j < mapLinks.length; j++){
              if(mapLinks[j].link == mapLink.link){
                isDup = true;
              }
            }
            if(!isDup){
              mapLinks.push(mapLink);
            }
          }
          var mapData = topojson.feature(rawJson, rawJson.objects.places);
          var listMapLinks = mapLinks.map((mapLink, i) =>
              <li key={mapLink.name + mapLink.link + i}><a href={mapLink.link} target="_blank">{mapLink.name}</a></li>);

          var listElements = programList[i].elements.map((element)=>
                <li className="help-text" key={element}>{element}</li>);
          var listAllocation = programList[i].AndarDataOutput.map((andarData) =>
              <li key={andarData.grant_date.substring(0,4)}>Funding Period: {andarData.grant_date.substring(0,4)}-{andarData.grant_end.substring(0,4)},  $ Invested: {andarData.yearly_allocation}</li>
          )

          var listDescriptions = programList[i].AndarDataOutput.map((andarData) =>
            <p key={andarData.grant_date.substring(0,4)}> andarData.description </p>
        )
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
                  <dd>{listDescriptions}</dd>
                  <dt>Program website: </dt>
                  <dd>{programList[i].website}</dd>
                    <dt>Program Focus: </dt>
                    <dd>{programList[i].AndarDataOutput.focus}</dd>
                    <dt>Program Elements: </dt>
                    <dd>{listElements}</dd>
                    <dt>Yearly Allocation: </dt>
                    <dd>{listAllocation}</dd>
                    <dt>Google Map Links: </dt>
                    <dd>{listMapLinks}</dd>

              </dl>
              </div>
              <div className="large-6 column">
                <Map width={width} height={height} scale={scale} zoomScale={this.state.scale} scaleExtent={scaleExtent} center={center}>
                    <MarkerGroup key={"polygon-test"} data={mapData} popupContent={popupContent} onClick={onPolygonClick} onCloseClick={onPolygonCloseClick} markerClass={"your-marker-css-class"}/>
                </Map>
                </div>
                <hr />
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
        var dataFromDash = this.state.data;
        var programList = this.createListings(dataFromDash);
        const listPrograms = this.renderListings(programList);

        return (
            <div className="row"><h4 style={{
                margin: "20px",
                textAlign: "center"
            }}>Listing Section</h4> <hr />
              {listPrograms}
            </div>
        )
    }
})

module.exports = Listing;
