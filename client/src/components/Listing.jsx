var React = require('react');

var Listing = React.createClass({

  createListings : function(data){
    var dataFromDash = data;
    var programList = [];
    var program = {
      "elements" : [],
      "locations" : [],
      "agency" : "",
    };
    for(var i =0 ; i < dataFromDash.Program.length; i++){
      program = dataFromDash.Program[i];
      var locations = [];
      var elements = [];
      for(var j = 0; j < dataFromDash.Location.length; j++){
        if(program.id === dataFromDash.Location[j].andar_id){
          locations.push(dataFromDash.Location[j].postal); //TODO: Change to Coordinates after Backend Change
        }
      }
      for(var k = 0; k < dataFromDash.Agency.length; k++){
        if(dataFromDash.Agency[k].id === program.agency_andar){
          program.agency = dataFromDash.Agency[k].name;
        }
      }
      for(var l = 0; l < dataFromDash.ProgramElement.length; l++){
        if(program.id === dataFromDash.ProgramElement[l].andar_id){
          elements.push(dataFromDash.ProgramElement[l].element);
        }
      }
      program.elements = elements;
      program.locations = locations;
      programList.push(program);
    }
    return programList;
  },

  render: function(){
    var dataFromDash = this.props.data;
    var programList = this.createListings(dataFromDash);
    const listPrograms = programList.map((program)=>
        <div key={program.id} className="large-12 column">
          <h3>Program Name: {program.name}</h3>
      <p>List of Elements: {program.elements}</p>
        </div>
      )
    return(
      <div className="row">
      {listPrograms}
    </div>
    )
  }
})

module.exports = Listing;
