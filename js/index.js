
var demoManager = (function () {
    var importanceList = document.getElementById("importance-radio");
    var businessList = document.getElementById("business-list");
    var email = document.getElementById("email");
    var businessDefault = document.getElementById("business-default");
    var dropdownMenu = document.querySelector(".dropdown-menu");

    var dropdownDisplay = document.querySelector(".dropdown-display").addEventListener("click", toggleDropdown);
    document.querySelector("body").addEventListener("click", checkDropdownVisibility);
    document.getElementById("submit-button").addEventListener("click", submitHandler);
    
    var businessSize = ["1-10", "11-50", "51-100", "101-250", "250+"];
    var importanceData = ["Real-time Analytics", "Query Response Time", "High Concurrency", "Fast Data Ingest", "Scalability", 
    "Document Storage", "Full Text Search", "Price"];

    //default for dropdown menu
    dropdownMenu.style.visibility = "hidden";

    //default for radio label text color
    var lastLabelChanged = null;

    var importanceRadio = "importance-selector";

    //dynamically generate dropdown menu and radio buttons
    createRadioButtons(importanceData, importanceList, importanceRadio);
    fillDropdown(businessSize, businessList);

    businessList.addEventListener("click", selectBusinessSize);


    function fillDropdown(data, ul) {
        for (var i in data) {
            var li = document.createElement("li");
            var p = document.createElement("p");
            var text = document.createTextNode(data[i]);
            p.appendChild(text);
            li.className = "dropdown-li";
            li.appendChild(p);
            ul.appendChild(li);
        }  
    }
    
    function selectBusinessSize(event) {
        businessDefault.innerText = event.target.innerText;
        toggleDropdown();
    }

    function checkDropdownVisibility(event) {
        if(event.target.className !== "fa fa-chevron-down" && event.target.className !== "dropdown-display" 
        && event.target.id !== "dropdown-default") {
            dropdownMenu.style.visibility = "hidden";
        }
    }

    function toggleDropdown() {
        if (dropdownMenu.style.visibility === "hidden") {
            dropdownMenu.style.visibility = "initial";
        } else {
            dropdownMenu.style.visibility = "hidden";
        }
    }

    function createRadioButtons(data, ul, radioName) {
        for (var i in data) {
            var li = document.createElement("li");            
            var label = document.createElement("label");
            var text = document.createTextNode(" " + data[i]);
            var radio = document.createElement("input");
            var div = document.createElement("div");

            div.className = "custom-radio";
            radio.type = "radio";
            radio.name = radioName;
            radio.value = data[i];

            label.appendChild(radio);
            label.appendChild(div);
            label.appendChild(text);

            li.appendChild(label);
            li.className = "radio-li";
            li.addEventListener("click", radioLabelColor);
            ul.appendChild(li);
        }
    }

    function radioLabelColor(event) {
        //this conditional is for event bubbling from radio input
        if (event.target.type !== "radio") {
            this.classList.add("blue");
            if(lastLabelChanged !== null && this !== lastLabelChanged) {
                lastLabelChanged.classList.remove("blue");
            }  
            lastLabelChanged = this;
        } 
    }

    function getRadioValue (groupName) {
        var buttons = document.getElementsByName(groupName);
        for (var i in buttons) {
            if (buttons[i].checked) {
                return buttons[i].value;
            } 
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        event.target.classList.add("dark-blue-background");
        var importance = getRadioValue(importanceRadio);
       
        if(validateForm(importance)) {
            if(importance === "Document Storage" || importance === "Full Text Search" || importance === "Price" 
            || businessDefault.innerText === "1-10") {
                window.location = "./unqualified.html";
            } else {
                window.location = "./qualified.html";
            }
        }
    }
    
    function validateForm (importance) {
        var isEmailValid = validateEmail();
        var isDropdownSelected = validateBusinessSize();
        var isRadioSelected = validateImportance(importance);

        if (isEmailValid && isDropdownSelected && isRadioSelected) {
            return true;
        } else {
            false;
        }
    }

    function validateEmail () {
        var errorEmail = document.getElementById("error-email");
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (re.test(email.value)) {
            errorEmail.style.visibility = "hidden";
            email.classList.remove("input-failure");
            email.classList.add("input-success");
            return true;
        } else {
            errorEmail.style.visibility = "initial";
            email.classList.add("input-failure");
            return false;
        }
    }

    function validateBusinessSize () {
        var errorBusinessSize = document.getElementById("error-business");
        if (businessDefault.innerText === "Select Size") {
            errorBusinessSize.style.visibility = "initial";
            return false;
        } else {
            errorBusinessSize.style.visibility = "hidden";
            return true;
        }
    }

    function validateImportance (importance) {
        var errorImportance = document.getElementById("error-importance");
        if (!importance) {
            errorImportance.style.visibility = "initial";
            return false;
        } else {
            errorImportance.style.visibility = "hidden";
            return true;
        }
    }


})();

