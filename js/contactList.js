
function ContactList(people, personSelectedCallback, personSelectedContext)
{
    this.root = document.getElementById("contact-list").getElementsByTagName("ul")[0];

    this.searchField = document.getElementById("search");
    this.searchField.onkeyup = this.filterList.bind(this);

    this.selected = null;

    this.personSelectedCallback = personSelectedCallback;

    this.personSelectedContext = personSelectedContext;

    this.people = [];

    people.forEach(function(person){    

        this.addPerson(person, this.selected == null);

    }.bind(this));
}

ContactList.prototype = Object.create({});

ContactList.prototype.addPerson = function(person, select)
{
    this.people.push(person);

    var element = person.getSummaryDom();

    element.onclick = function() {

        this._select(element, person);
    
    }.bind(this);

    this.root.appendChild(element);

    if(select)
    {
        this._select(element, person);
    }
};

ContactList.prototype.removePerson = function(person)
{
    var index = this.people.indexOf(person);
    if (index != -1)
    {
        this.people.splice(index, 1);
        this.root.removeChild(person.getSummaryDom());
    }
};

ContactList.prototype.filterList = function()
{
    var value = this.searchField.value.toUpperCase();;

    this.people.forEach(function(person){
        var name = person.name.toUpperCase();

        if(name.indexOf(value) != -1)
        {
            person.getSummaryDom().style.display = "";
        }
        else
        {
            person.getSummaryDom().style.display = "none";
        }
    });
}

ContactList.prototype._select = function(element, person)
{
    if(this.selected)
    {
        this.selected.deselect();
    }

    if (this.personSelectedCallback)
    {
        this.personSelectedCallback.call(this.personSelectedContext, person);
    }

    this.selected = person;

    this.selected.select();

    storage.save(this.people);
}