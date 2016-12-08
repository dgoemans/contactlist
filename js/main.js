(function main()
{
    window.onload = function()
    {
        var contactList;

        var contactView;

        var selectedPerson = null;

        var singleColumnDisplay = window.matchMedia("(max-width: 800px)");

        disableNewLines();

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

            setupButtons(selectedPerson);

            if(singleColumnDisplay.matches)
            {
                contactList.exit();
                contactView.enter();
            }

            contactView.showPerson(person);
        }

        function setupButtons(person)
        {
            document.getElementById("call").href = "tel:" + person.getPhoneNumber();
            document.getElementById("mail").href = "mailto:" + person.getEmailAddress();
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

            var index = contactList.removePerson(selectedPerson);
            
            dataChanged("remove", selectedPerson);

            if(!singleColumnDisplay.matches)
            {
                contactList.select(index-1);
            }
            else
            {
                contactList.enter();

                contactView.exit();
            }
        };

        document.getElementById("back").onclick = function()
        {
            contactList.enter();

            contactView.exit();
        };

        document.getElementById("call").onclick = function()
        {
            
        };

        document.getElementById("mail").onclick = function()
        {
            
        };
    }

    function disableNewLines()
    {
        var singleLineElements = document.getElementsByClassName("single-line");

        for(var i=0; i<singleLineElements.length; i++)
        {
            var element = singleLineElements[i];
            element.onkeydown = function(event){
                if(event.which === 13)
                {
                    event.preventDefault();
                    console.log("caught enter");
                }
            };
        }
    }


})();