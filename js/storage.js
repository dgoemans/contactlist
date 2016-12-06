function Storage()
{
    this.people = [];
};

Storage.prototype = Object.create({});

Storage.prototype.load = function(callback, context) 
{
    remote.load(function(remoteData){
        
        var result = this._gotRemote(remoteData);

        this.people = result;

        callback.call(context, result);
    }, this);
    
};

Storage.prototype._gotRemote = function(remoteData)
{
    var merged = [];

    remoteData.forEach(function(personData)
    {
        var person = new Person();
        person.load(personData);
        merged.push(person);
    });

    var stored = localStorage.getItem("contacts");

    if(stored)
    {
        var people = this._localLoad(stored);

        people.forEach(function(person){
            
            var existing = this._find(person, merged);

            if(!existing)
            {
                merged.push(person);
            }
        }.bind(this));
    }

    return merged;
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

Storage.prototype._remove = function(person)
{
    remote.removePerson(person);

    var found = this._find(person, this.people);
    
    var index = this.people.indexOf(found);

    if(index !== -1)
    {
        this.people.splice(index,1);
    }
};

Storage.prototype._edit = function(person)
{
    remote.editPerson(person);

    var found = this._find(person, this.people);

    if(found)
    {
        found.load(person);
    }
    else
    {
        this.people.push(person);
    }
};

Storage.prototype.dataChanged = function(action, person)
{
    switch(action)
    {
        case "add":
        case "edit":
            this._edit(person);
            break;
        case "remove":
            this._remove(person);
            break;
    }

    this._localSave(this.people);
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