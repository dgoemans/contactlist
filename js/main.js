(function main()
{
    window.onload = function()
    {
        var contactList;

        var contactView;

        var selectedPerson = null;

        storage.load(function(people)
        {
            contactView = new ContactView(dataChanged, this);

            contactList = new ContactList(people, personSelected, this);

        }, this);

        function personSelected(person)
        {
            selectedPerson = person;

            contactView.showPerson(person);
        }

        function dataChanged()
        {
            storage.save(contactList.people);
        }
        
        document.getElementById("add-button").onclick = function(){
            var person = new Person();
            
            contactList.addPerson(person, true);

            dataChanged();
        }

        document.getElementById("delete").onclick = function(){
            contactList.removePerson(selectedPerson);

            dataChanged();
        };
        
        
    }

})();