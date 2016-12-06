function Storage()
{

};

Storage.prototype = Object.create({});

Storage.prototype.load = function(callback, context) 
{
    remote.load(function(remoteData){
        
        var result = this._gotRemote(remoteData);

        callback.call(context, result);
    }, this);
    
};

Storage.prototype._gotRemote = function(remoteData)
{
    var result = [];

    remoteData.forEach(function(personData)
    {
        var person = new Person();
        person.load(personData);
        result.push(person);
    });

    var stored = localStorage.getItem("contacts");

    if(stored)
    {
        var people = this._localLoad(stored);

        people.forEach(function(person){
            
            var existing = this._find(person, result);

            if(existing)
            {
                existing.load(person);
            }
            else
            {
                result.push(person);
            }
        }.bind(this));
    }

    return result;
};

Storage.prototype._find = function(person, people)
{
    var found = null;

    people.forEach(function(other){
       if(person.id === other.id)
       {
           found = other;
       } 
    });

    return found;
};

Storage.prototype.dataChanged = function(action, person)
{
    switch(action)
    {
        case "add":
            remote.addPerson(person);
            break;
        case "remove":
            remote.removePerson(person);
            break;
        case "edit":
            remote.editPerson(person);
            break;
    }

    this._localSave(contactList.people);
};

Storage.prototype._localSave = function(people)
{
    localStorage.setItem("contacts", JSON.stringify(people) );
};

Storage.prototype._localLoad = function(data)
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
};

var storage = new Storage();