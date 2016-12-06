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

            if(!singleColumnDisplay.matches)
            {
                contactList.selectFirst();
            }

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
            
            person.id = utils.generateUuid();

            contactList.addPerson(person, true);

            dataChanged("add", person);
        }

        document.getElementById("delete").onclick = function(){
            contactList.removePerson(selectedPerson);

            if(!singleColumnDisplay.matches)
            {
                contactList.selectFirst();
            }

            dataChanged("remove", selectedPerson);
        };

        document.getElementById("back").onclick = function(){
            dataChanged("edit", selectedPerson);

            contactList.enter();
            contactView.exit();
        };
        
        
    }

})();