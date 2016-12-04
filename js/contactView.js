
function ContactView(dataChangedCallback, dataChangedContext)
{
    this.root = document.getElementById("contact-view");

    this.selected = new Person();

    this.boundPerson = null;

    this.binding = new BoundObject(this.root, this.selected, dataChangedCallback, dataChangedContext);
}

ContactView.prototype = Object.create({});

ContactView.prototype.showPerson = function(person)
{
    if (this.boundPerson)
    {
        this.boundPerson.load(this.selected);
    }

    this.boundPerson = person;

    this.selected.load(person);

    this.binding.updateDom();
};