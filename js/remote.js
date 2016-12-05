function Remote()
{
    this.baseUrl = "http://davidgoemans.com/demo/contacts/";

};

Remote.prototype = Object.create({});

Remote.prototype.load = function(callback, context) 
{   
    this._ajax("getall", function(){

    }, this);
};

Remote.prototype.addPerson = function(person)
{
    this._ajax("add", function(){

    }, this, person);
};

Remote.prototype.removePerson = function(person)
{
    this._ajax("remove", function(){

    }, this, person);
};

Remote.prototype.editPerson = function(person)
{
    this._ajax("edit", function(){

    }, this, person);
};

Remote.prototype._ajax = function(endpoint, callback, context, data)
{
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            callback.call(context, JSON.parse(xhr.responseText));     
        }
    };
    
    xhr.open("POST", this.baseUrl + endpoint + ".php", true);    
    xhr.send(JSON.stringify(data));
}

var remote = new Remote();