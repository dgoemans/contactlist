
function ContactView(dataChangedCallback, dataChangedContext)
{
    this.root = document.getElementById("contact-view");

    this.photo = document.getElementById("view-photo");

    this.hiddenInput = document.getElementById("choose-image");

    this.photo.onclick = this._choosePhoto.bind(this);

    this.selected = new Person();

    this.boundPerson = null;

    this.dataChangedCallback = dataChangedCallback;

    this.dataChangedContext = dataChangedContext;

    this.binding = new BoundObject(this.root, this.selected, this._dataChanged, this);
}

ContactView.prototype = Object.create({});

ContactView.prototype._dataChanged = function()
{
    this.dataChangedCallback.call(this.dataChangedContext, "edit", this.boundPerson);
}

ContactView.prototype._choosePhoto = function()
{
    this.hiddenInput.click();

    this.hiddenInput.onchange = function(){
        
        new FileUpload(this.hiddenInput.files[this.hiddenInput.files.length - 1], this._uploadComplete, this);
        
    }.bind(this);
};

ContactView.prototype._uploadComplete = function(url)
{
    this.selected.image = url;

    this.boundPerson.load(this.selected);

    this._dataChanged();

    this.binding.updateDom();
};

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

ContactView.prototype.enter = function()
{
    this.root.style["animation-name"] = "enter-right";
};

ContactView.prototype.exit = function()
{
    this.root.style["animation-name"] = "exit-right";
};