function Person()
{
    this.name = "-";

    this.image = "";

    this.phoneWork = "";

    this.phoneMobile = "";

    this.emailWork = "";

    this.emailPrivate = "";

    this.address = "";

    this.note = "";

    this.listDom = this._createDomListElement();

    this.binding = new BoundObject(this.listDom, this);
}

Person.prototype = Object.create({});

Person.prototype._createDomListElement = function()
{
    var element = document.createElement("li");
        
    element.className = "contact-summary";

    element.innerHTML = '<div class="photo"><img src="'+this.image+'"/></div><div><p data-dom="textContent" data-js="name">'+this.name+'</p></div><div class="arrow"></div>';

    return element;
}

Person.prototype.load = function(data)
{
    this.name = data.name;

    this.image = data.image;
    
    this.phoneWork = data.phoneWork;

    this.phoneMobile = data.phoneMobile;

    this.emailWork = data.emailWork;

    this.emailPrivate = data.emailPrivate;

    this.address = data.address;

    this.note = data.note;

    this.binding.updateDom();
}

Person.prototype.getSummaryDom = function()
{
    return this.listDom;
}

Person.prototype.select = function()
{
    this.listDom.className = "contact-summary selected";
}

Person.prototype.deselect = function()
{
    this.listDom.className = "contact-summary";
}

Person.prototype.toJSON = function()
{
    return { 
        name: this.name, 
        image: this.image,
        phoneWork: this.phoneWork,
        phoneMobile: this.phoneMobile,
        emailWork: this.emailWork,
        emailPrivate: this.emailPrivate,
        address: this.address,
        note: this.note
    };
}