function Utils()
{
}

Utils.prototype.generateUuid = function()
{
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    return uuid;
}

Utils.prototype.removeBreaks = function(html)
{
    return html.replace(/(<\/?br\/?>)/,'');
}

var utils = new Utils();


