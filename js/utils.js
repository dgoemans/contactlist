function Utils()
{
}

Utils.prototype.getAttribute = function(element, attribute) 
{
    var result = (element.getAttribute && element.getAttribute(attribute)) || null;
    if( !result ) 
    {
        var attrs = element.attributes;
        var length = attrs.length;
        for(var i = 0; i < length; i++)
        {
            if(attrs[i].nodeName === attribute)
            {
                result = attrs[i].nodeValue;
            }
        }
    }
    return result;
}

var utils = new Utils();


