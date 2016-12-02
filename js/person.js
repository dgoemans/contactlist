function Person(name, image)
{
    this.name = name;

    this.image = image;
}

Person.prototype = Object.create({});

Person.prototype.getSummaryTemplate = function()
{
    return '<div class="photo"><img src="'+this.image+'"/></div><div><p>'+this.name+'</p></div><div class="arrow"></div>';
}

Person.prototype.getViewTemplate = function()
{
    var template = '<div class="row"><div class="photo"><img src="'+this.image+'"/></div><div class="name">'+this.name+'</div></div>';

    template += this._line();

    template += this._createViewRow("work", "010 1233456");

    template += this._createViewRow("mobile", "064 123545");
    
    template += this._line();

    return template;
}

Person.prototype._line = function()
{
    return '<div class="line"></div>';
}

Person.prototype._createViewRow = function(key, value)
{
    return '<div class="row"><div class="label">'+key+'</div><div class="name">'+value+'</div></div>';
}