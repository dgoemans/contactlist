
function FileUpload(file, completeCallback, completeContext) 
{
    var reader = new FileReader();  

    var xhr = new XMLHttpRequest();

    this.xhr = xhr;

    this.xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) 
        {
            var percentage = Math.round((e.loaded * 100) / e.total);
            
            window.status = percentage + "%";
        }
    }.bind(this), false);

    xhr.onload = function() {
        completeCallback.call(completeContext, "http://davidgoemans.com/demo/contacts/images/" + xhr.responseText);
    };

    xhr.open("POST", "http://davidgoemans.com/demo/contacts/upload.php");
    
    //xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');

    reader.onload = function(evt) {
        xhr.send(evt.target.result);
    };

    reader.readAsArrayBuffer(file);
}