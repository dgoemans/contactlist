
function ContactView()
{
    this.root = document.getElementById("contact-view");

}

ContactView.prototype.showPerson = function(person)
{
    this.root.innerHTML = person.getViewTemplate();
};