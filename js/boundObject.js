
function BoundObject(domRoot, jsObject, dataChangedCallback, dataChangedContext)
{
    this._domUpdates = [];

    this._jsUpdates = [];

    this._jsObject = jsObject;

    this._domRoot = domRoot;

    this.dataChangedCallback = dataChangedCallback;

    this.dataChangedContext = dataChangedContext;

    this._bindNodes(this._domRoot);
}

BoundObject.prototype = Object.create({});

BoundObject.prototype._bindNodes = function(node)
{
    var children = node.childNodes;

    for(var i=0; i<children.length; i++)
    {
        var child = children[i];

        if(!child.getAttribute)
        {
            continue;
        }

        this._dataBinding(child);

        var updateFunction = this._createDomBinding(child);

        if(updateFunction)
        {
            this._domUpdates.push(updateFunction);
        }

        this._bindNodes(child);
    }
}

BoundObject.prototype.updateDom = function()
{
    this._domUpdates.forEach(function(updateElement){
        updateElement();
    });
}

/**
 * Binds dom data to js, for input to map onto js data  
 */
BoundObject.prototype._dataBinding = function(domElement) 
{    
    var domAttr = domElement.getAttribute("data-dom");
    var itemAttr = domElement.getAttribute("data-js");
    var validation = domElement.getAttribute("data-validation");

    var defaultClasses = domElement.className;

    if(!domAttr && !itemAttr)
    {
        return;
    }

    domElement.onblur = updateObj.bind(this);
    
    function updateObj() {

        if(!this._validate(domElement[domAttr], validation))
        {
            domElement.className = defaultClasses + " invaild";
            console.log("Validation failed");
            return;
        }
        
        domElement.className = defaultClasses;
        
        this._jsObject[itemAttr] = domElement[domAttr];

        if(this.dataChangedCallback)
        {
            this.dataChangedCallback.call(this.dataChangedContext, this._jsObject, itemAttr);
        }
    };

    var obj = this._jsObject;

    domElement[domAttr] = this._jsObject[itemAttr];
}   

BoundObject.prototype._validate = function(data, type)
{
    if(data.length === 0)
    {
        return true;
    }

    var regex = "";
    switch(type)
    {
        case "number":
            regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
            break;
        case "email":
            // http://emailregex.com/
            regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            break;
        default:
            return true;
    }

    return regex.test(data);
}


/**
 * Binds js data to dom, for any changes under the hood to reflect in the dom
 */
BoundObject.prototype._createDomBinding = function(domElement)
{
    var domAttr = domElement.getAttribute("data-dom");
    var itemAttr = domElement.getAttribute("data-js");

    var defaultClasses = domElement.className;

    if(!domAttr && !itemAttr)
    {
        return null;
    }
    
    return function() {
            domElement[domAttr] = this._jsObject[itemAttr];

            domElement.className = defaultClasses;
    }.bind(this);
}