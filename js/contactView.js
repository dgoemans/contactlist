
function ContactView(dataChangedCallback, dataChangedContext)
{
    this.root = document.getElementById("contact-view");

    this.photo = document.getElementById("view-photo");

    this.hiddenInput = document.getElementById("choose-image");

    this.star = document.getElementById("favorite");

    this.photo.onclick = this._choosePhoto.bind(this);

    this.star.onclick = this._favorite.bind(this);

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
    console.log("Upload complete");
    console.log(this);
    this.selected.image = url;

    this.boundPerson.load(this.selected);

    this._dataChanged();

    this.binding.updateDom();
};

ContactView.prototype._favorite = function()
{
    this.selected.favorite = !this.selected.favorite;

    this.boundPerson.load(this.selected);

    this.star.className = this.selected.favorite ? "star star-on" : "star star-off";

    this._dataChanged();
}

ContactView.prototype.showPerson = function(person)
{
    console.log("Showing person");
    if (this.boundPerson)
    {
        this.boundPerson.load(this.selected);
    }

    this.boundPerson = person;

    this.selected.load(person);

    console.log("Loading: " + person.id);

    console.log("Selected: " + this.selected.id);

    this.star.className = this.selected.favorite ? "star star-on" : "star star-off";

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