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
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" id="CSVUpload" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile} />
               </form>
            </div>
        );
    }
});

module.exports = Import;
