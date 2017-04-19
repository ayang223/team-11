import cookie from 'react-cookie';
var React = require('react');
var Baby = require('babyparse');
var url = require('url');
var {hashHistory} = require('react-router');
var loadingImg = require('public/pie.svg');
var $ = require('jQuery');
var buttonStyle={
  margin : "20px",
  align: "center"
}

var loading={
  width: "200px",
  height: "200px"
}



var Import = React.createClass({
    getInitialState: function(){
      return{
        loading: 0,
      }
    },


    componentWillMount: function() {
      var _this = this;
      var getUsers = $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
          "action" : "Most Recent Import"
        }),
        dataType: "json",
        success: function(data) {
          var recentImportMessage;
          if (!data || !data["Most Recent Import"] || data["Most Recent Import"].length === 0) {
            recentImportMessage = "No data has been imported yet.";
          } else {
            var recentImportUser = data["Most Recent Import"][0].username;
            var recentImportTime = data["Most Recent Import"][0].date_time;
            var recentImportMessage = "The most recent import of data was on " + recentImportTime + " by user " + recentImportUser + ".";
          }
          this.setState({
            recentImportMessage: recentImportMessage
          })
        }.bind(this),
        error: function(error) {
        }
      });
    },

    componentDidMount: function() {
    },

    importProgram : function(e){
      var svgFrag = '<svg>' + loadingImg + '</svg>';
      var file = document.getElementById('CSVUpload').files[0];
      if(file == null){
        alert("No file selected!");
        return null;
      }else{
      document.getElementById('errorOut').innerHTML = '' + svgFrag;
      console.log(file);
       var reader = new FileReader();
       reader.onload = function () {
           var result = reader.result;
           var parsed = Baby.parse(result);
           var username = cookie.load('userID');
           // Currently the result is in this scope, so if we want to pass this data to
           // the backend server, the call will have to be in here
           //document.getElementById('json').innerHTML = JSON.stringify(parsed);
           $.ajax({
                url:url,
                type: "POST",
                data: JSON.stringify({
                  "action" : "Import Programs",
                  "data": parsed.data,
                  "user": username
                }),
                dataType:"json",
                success:function(data){
                  if(data.status === 'failed'){
                    alert("Error Message: Something happened during the request to send data from server, please contact your Administrator");
                    document.getElementById('errorOut').innerHTML = "Upload Failed, may be bad connection to Database, or the data already exists";
                  }else{
                    document.getElementById('errorOut').innerHTML = "Upload Success! You can navigate to Dashboard for analytics now.";
                    var getUsers = $.ajax({
                      url: url,
                      type: "POST",
                      data: JSON.stringify({
                        "action" : "Most Recent Import"
                      }),
                      dataType: "json",
                      success: function(data) {
                        if (!data || !data["Most Recent Import"] || data["Most Recent Import"].length === 0) {
                          document.getElementById('mostRecentUpload').innerHTML = "No data has been imported yet.";
                        } else {
                          var recentImportUser = data["Most Recent Import"][0].username;
                          var recentImportTime = data["Most Recent Import"][0].date_time;
                          document.getElementById('mostRecentUpload').innerHTML = "The most recent import of data was on " + recentImportTime + " by user " + recentImportUser + ".";
                        }
                      }.bind(this),
                      error: function(error) {
                      }
                    });
                  }
                   console.log(data)
                 }.bind(this),
                 error:function(error){
                   console.log(error);
                   document.getElementById('errorOut').innerHTML = "Upload Failed";
               }
             });

         };
       // start reading the file. When it is done, calls the onload event defined above.
       reader.readAsBinaryString(file);
     }
      },

      importOutput : function(e){
        var _this = this;
        var svgFrag = '<svg>' + loadingImg + '</svg>';
        var file = document.getElementById('CSVUpload').files[0];
        if(file == null){
          alert("No file selected!");
          return null;
        }else{
        document.getElementById('errorOut').innerHTML = '' + svgFrag;
        console.log(file);
        var reader = new FileReader();
         reader.onload = function () {
             var result = reader.result;
             var parsed = Baby.parse(result);
             var username = cookie.load('userID');
             // Currently the result is in this scope, so if we want to pass this data to
             // the backend server, the call will have to be in here
             $.ajax({
                  url:url,
                  type: "POST",
                  data: JSON.stringify({
                    "action" : "Import Output",
                     "data": parsed.data,
                     "user": username
                  }),
                  dataType:"json",
                  success:function(data){
                    if(data.status === 'failed'){
                      alert("Error Message: Something happened during the request to send data from server, please contact your Administrator");
                      document.getElementById('errorOut').innerHTML = "Upload Failed, possibly bad connection to database, or the data already exists. Please contact your Administrator";
                    }else{
                      document.getElementById('errorOut').innerHTML = "Upload Success!";
                      var getUsers = $.ajax({
                        url: url,
                        type: "POST",
                        data: JSON.stringify({
                          "action" : "Most Recent Import"
                        }),
                        dataType: "json",
                        success: function(data) {
                          if (!data || !data["Most Recent Import"] || data["Most Recent Import"].length === 0) {
                            document.getElementById('mostRecentUpload').innerHTML = "No data has been imported yet.";
                          } else {
                            var recentImportUser = data["Most Recent Import"][0].username;
                            var recentImportTime = data["Most Recent Import"][0].date_time;
                            document.getElementById('mostRecentUpload').innerHTML = "The most recent import of data was on " + recentImportTime + " by user " + recentImportUser + ".";
                          }
                        }.bind(this),
                        error: function(error) {
                        }
                      });
                    }
                     console.log(data)
                   }.bind(this),
                   error:function(error){
                     console.log(error);
                    document.getElementById('errorOut').innerHTML = "Upload Failed";
                 }
               });

           };
         // start reading the file. When it is done, calls the onload event defined above.
         reader.readAsBinaryString(file);
       }
        },

    render: function() {
        return (
            <div className="row" style={{padding: "10%"}}>
              <h2 style={{margin:"20px", textAlign: "center"}}>Welcome to the Import Page!</h2><hr />
              <p className="help-text" style={{margin:"20px", textAlign: "center"}}>You can import new Andar Data below. Please click the appropriate upload button depending on the data you are uploading</p>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input className="button success button" style={buttonStyle}  ref="file" id="CSVUpload" type="file" name="file" className="upload-file"/>
                   <p className="help-text" style={{marginLeft:"20px", textAlign: "left"}}> If this is the first time in the year that Andar data is uploaded, please upload the Output .csv file first before the Program. </p>
                    <p className="help-text" style={{marginLeft:"20px", textAlign: "left"}}> If you are uploading a document with duplicate funding year, the old data will be overwritten</p>
                 <input className="button success button" style={buttonStyle} type="button" ref="button" value="Upload Program File" onClick={this.importProgram} />
                   <input className="button success button" style={buttonStyle} type="button" ref="button" value="Upload Output File" onClick={this.importOutput} />
                   <br/><br/>
               </form>
               <div id="mostRecentUpload" style={{margin:"20px"}}>
               {this.state.recentImportMessage}
               </div> <hr />
               <h3 style={{margin: "20px"}}>Status of Upload:</h3>
               <div id="errorOut" style={{margin:"20px"}}>Status of upload will be displayed here
             </div>

               <br/><br/>
                 <br/><br/>
            </div>
        );
    }
});

module.exports = Import;
