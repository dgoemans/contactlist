
function ContactList(people, personSelectedCallback, personSelectedContext)
{
    this.root = document.getElementById("contact-list");

    this.listRoot = this.root.getElementsByTagName("ul")[0];

    this.searchField = document.getElementById("search");
    this.searchField.onkeyup = this.filterList.bind(this);

    this.selected = null;

    this.personSelectedCallback = personSelectedCallback;

    this.personSelectedContext = personSelectedContext;

    this.people = [];

    people.forEach(function(person){    

        this.addPerson(person);

    }.bind(this));
}

ContactList.prototype = Object.create({});

ContactList.prototype.addPerson = function(person, select)
{
    this.people.push(person);

    person.id = utils.generateUuid();

    var element = person.getSummaryDom();

    element.onclick = function() {

        this._select(element, person);
    
    }.bind(this);

    this.listRoot.appendChild(element);

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
        this.listRoot.removeChild(person.getSummaryDom());
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
};

ContactList.prototype._select = function(element, person)
{
    if(this.selected)
    {
        this.selected.deselect();

        storage.dataChanged("edit", this.selected);
    }

    if (this.personSelectedCallback)
    {
        this.personSelectedCallback.call(this.personSelectedContext, person);
    }

    this.selected = person;

    this.selected.select();
};

ContactList.prototype.enter = function()
{
    this.root.style["animation-name"] = "enter-left";
};

ContactList.prototype.exit = function()
{
    this.root.style["animation-name"] = "exit-left";
};