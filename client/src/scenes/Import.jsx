var React = require('react');

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
               <div id="out">
                 
               </div>
            </div>
        );
    }
});

module.exports = Import;
