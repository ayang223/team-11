var React = require('react');
var Baby = require('babyparse');

var Import = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);

        // TODO: need to do a call to the backend to give the data
        // $.ajax({
        //     url: '',
        //     data: fd,
        //     processData: false,
        //     contentType: false,
        //     type: 'POST',
        //     success: function(data){
        //         alert(data);
        //     }
        // });
        e.preventDefault()
    },

    convertJSON : function(e){
      var file = document.getElementById('CSVUpload').files[0];
      console.log(file);
       var reader = new FileReader();
       reader.onload = function () {
           document.getElementById('out').innerHTML = reader.result;
           var result = reader.result;
           var parsed = Baby.parse(result);
           // Currently the result is in this scope, so if we want to pass this data to
           // the backend server, the call will have to be in here
           document.getElementById('json').innerHTML = JSON.stringify(parsed, null, 2);
         };
       // start reading the file. When it is done, calls the onload event defined above.
       reader.readAsBinaryString(file);
    },

    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" id="CSVUpload" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.convertJSON} />
               </form>
               <h2>String format: </h2>
               <div id="out">
               </div>
               <h2>JSON format: </h2>
               <div id="json">
               </div>
            </div>
        );
    }
});

module.exports = Import;
