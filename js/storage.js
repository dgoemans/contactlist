function Storage()
{

};

Storage.prototype = Object.create({});

Storage.prototype.load = function(callback, context) 
{
    var stored = localStorage.getItem("contacts");

    if(stored)
    {
        var people = this._deserialize(stored);
    }
    else
    {
        people = [];
    }

    callback.call(context, people);
    
};

Storage.prototype.save = function(people)
{
    this._serialize(people);
};

Storage.prototype._deserialize = function(data)
{
    var result = [];

    try
    {
        var rawObject = JSON.parse(data);

        rawObject.forEach(function(personData){
            var person = new Person();
            person.load(personData);
            result.push(person);
        });
    }
    catch(e)
    {
        console.log("Failed to load contacts: " + e.message);
    }
    
    return result;
}

Storage.prototype._serialize = function(people)
{
    localStorage.setItem("contacts", JSON.stringify(people) );
}

var storage = new Storage();