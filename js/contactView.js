
function ContactView(dataChangedCallback, dataChangedContext)
{
    this.root = document.getElementById("contact-view");

    this.photo = document.getElementById("view-photo");

    this.hiddenInput = document.getElementById("choose-image");

    this.photo.onclick = this.choosePhoto.bind(this);

    this.selected = new Person();

    this.boundPerson = null;

    this.binding = new BoundObject(this.root, this.selected, dataChangedCallback, dataChangedContext);
}

ContactView.prototype = Object.create({});

ContactView.prototype.choosePhoto = function()
{
    this.hiddenInput.click();

    this.hiddenInput.onchange = function(){
        
        new FileUpload(this.hiddenInput.files[this.hiddenInput.files.length - 1], this.uploadComplete, this);
        
    }.bind(this);
};

ContactView.prototype.uploadComplete = function(url)
{
    this.selected.image = url;

    this.boundPerson.load(this.selected);

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