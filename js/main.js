(function main()
{
    window.onload = function()
    {
        var contactList;

        var contactView;

        var selectedPerson = null;

        var singleColumnDisplay = window.matchMedia("(max-width: 800px)");

        storage.load(function(people)
        {
            contactView = new ContactView(dataChanged, this);

            contactList = new ContactList(people, personSelected, this);

        }, this);

        function personSelected(person)
        {
            selectedPerson = person;

            if(singleColumnDisplay.matches)
            {
                contactList.exit();
                contactView.enter();
            }

            contactView.showPerson(person);
        }

        function dataChanged(action, person)
        {
            storage.dataChanged(action, person);
        }
        
        document.getElementById("add-button").onclick = function(){
            var person = new Person();
            
            contactList.addPerson(person, true);

            dataChanged("add", person);
        }

        document.getElementById("delete").onclick = function(){
            contactList.removePerson(selectedPerson);

            dataChanged("remove", selectedPerson);
        };

        document.getElementById("back").onclick = function(){
            contactList.enter();
            contactView.exit();
        };
        
        
    }

})();