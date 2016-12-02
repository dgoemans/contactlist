(function main()
{
    window.onload = function()
    {
        var contactView = new ContactView();

        var contactList = new ContactList(contactView.showPerson, contactView);
        contactList.load();

        
        
    }

})();