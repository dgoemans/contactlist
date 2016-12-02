
function ContactList(personSelectedCallback, personSelectedContext)
{
    this.root = document.getElementById("contact-list").getElementsByTagName("ul")[0];

    this.people = [];

    this.selected = null;

    this.personSelectedCallback = personSelectedCallback;

    this.personSelectedContext = personSelectedContext;
}

ContactList.prototype = Object.create({});

ContactList.prototype.load = function()
{
    var savedContacts = localStorage.getItem("contacts");

    if(savedContacts)
    {
        this.people = this._generateContacts(JSON.parse(savedContacts));
    }
    else
    {
        this.people = [];
    }

    this.people.forEach(function(person){

        var element = document.createElement("li");
        
        element.className = "contact-summary";

        element.innerHTML = person.getSummaryTemplate();

        element.onclick = function() {

            this._select(element, person);
        
        }.bind(this);

        this.root.appendChild(element);

        if(!this.selected)
        {
            this._select(element, person);
        }

    }.bind(this));
}

ContactList.prototype._select = function(element, person)
{
    if(this.selected)
    {
        this.selected.className = "contact-summary";
    }

    this._personSelected(person);

    this.selected = element;

    this.selected.className += " selected";
}

ContactList.prototype._personSelected = function(person)
{
   if (this.personSelectedCallback)
    {
        //document.getElementById("contact-list").style.animation = "exit 1s ease-out";

        this.personSelectedCallback.call(this.personSelectedContext, person);
    }
}

ContactList.prototype._generateContacts = function(data)
{
    var result = [];

    data.forEach(function(personData){
        result.push(new Person(personData.name, personData.image));
    });

    return result;
}

ContactList.prototype.save = function()
{
    localStorage.setItem("contacts", JSON.stringify(this.people) );
}