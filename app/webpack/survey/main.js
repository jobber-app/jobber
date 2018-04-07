function Pager (id, onSubmit) {
    this.id = id;
    this.node = document.getElementById(this.id);
    this.pages = document.getElementsByClassName("page");
    
    this.scroller = document.getElementById("survey-scroller");
    
    this.prev = this.node.getElementsByClassName("prev")[0];
    this.prev.addEventListener("click", this.prevPage.bind(this));
    this.next = this.node.getElementsByClassName("next")[0];
    this.next.addEventListener("click", this.nextPage.bind(this));

    this.submit = document.getElementById("survey-submitter");

    this.setIndex(0);
}
Pager.prototype.setIndex = function (index) {
    if (this.index != undefined) {
        this.pages[this.index].classList.remove("showing");
    }
    if (this.index == index) return;

    this.index = index;

    this.pages[this.index].classList.add("showing");

    this.prev.style.display = null;
    this.next.style.display = null;
    this.submit.style.display = "none";
    this.prev.innerHTML = "Prev Section";
    this.next.innerHTML = "Next Section";
    if (this.index === 0) {
        this.prev.style.display = "none";
        this.next.innerHTML = "Start the Survey";
    } else if (this.index === this.pages.length - 1) {
        this.next.style.display = "none";
        this.submit.style.display = null;
    }
    
    // scroll the form back to the top
    this.scroller.scrollTop = 0;
}
Pager.prototype.nextPage = function () {
    if (this.index === this.pages.length - 1) return;
    this.setIndex(this.index + 1);
}
Pager.prototype.prevPage = function () {
    if (this.index === 0) return;
    this.setIndex(this.index - 1);
}

function Checklist (id, inputs, radio, unmodifiable) {
    this.id = id;
    this.node = document.getElementById(this.id);
    this.type = radio ? "radio" : "checkbox";

    // If radio mode is set, use same name for all boxes
    for (var input of inputs) {
        var name = input[0]; 
        var text = input[1];
        var c = this.createCheckbox(name, text);
        this.node.appendChild(c);
    }

    if (unmodifiable !== true) {
        var addButton = document.createElement("div");
        addButton.innerHTML = "Don't see your option? Click to add another.";
        addButton.className = "btn btn-themed btn-sm mt-2 w-100 border-0";
        addButton.addEventListener("click", this.newCustomInput.bind(this));
        this.addButton = addButton;
        this.node.appendChild(addButton);
    }
}
Checklist.prototype.removeChild = function (child) {
    this.node.removeChild(child);
}
Checklist.prototype.createCheckbox = function (name, text, checkbox, textNode) {
    var container = document.createElement("div");
    container.className = "form-check btn btn-light";

    if (textNode == undefined && checkbox == undefined) {
        checkbox = document.createElement("input");
        if (this.type === "radio") {
            checkbox.name = this.id;
            checkbox.value = name;
        } else {
            checkbox.name = name;
        }
        checkbox.type = this.type;
        checkbox.checked = false;

        container.addEventListener("click", function () {
            checkbox.checked = !checkbox.checked;
        });
        
        textNode = document.createTextNode(" " + text);
    }
    
    container.appendChild(checkbox);
    container.appendChild(textNode);
    return container;
}
Checklist.prototype.newCustomInput = function () {
    var remove = document.createElement("div");
    remove.className = "remove btn btn-outline-danger";
    remove.innerHTML = "&times;";
    remove.style.paddingLeft = "1px";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control form-control-sm";
    input.placeholder = "Enter new option here...";

    var container = this.createCheckbox("", "", remove, input);
    container.classList.add("d-flex", "align-items-center");
    remove.addEventListener("click", this.removeChild.bind(this, container));

    this.node.insertBefore(container, this.addButton);

    input.focus();
}

new Pager("survey-body");

new Checklist("how-tracking"
             ,[["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"]
              ,["spread", "Spreadsheets (Excel, Gnumeric, etc.)"]
              ,["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]
              ]
             );
new Checklist("extra-documents"
             ,[["cover", "Cover Letter"]
              ,["reference", "Letter of Reference / Recommendation"]
              ,["philosophy", "Work Philosophy"]
              ]
             );
new Checklist("document-creation-softwares"
             ,[["word", "Word / Google Docs / Other Office Suite Software"]
              ,["latex", "LaTeX"]
              ,["indesign", "InDesign / GIMP / Other Design and Artwork Software"]
              ]
             );
new Checklist("update-frequency"
             ,[["job", "For every job application"]
              ,["skill", "Every time I acquite a new skill"]
              ,[">1pmo", "More than once a month"]
              ,[">3pmo", "More than once every 3 months"]
              ,[">1pyr", "More than once a year"]
              ,["<1pyr", "Less than once a year"]
              ]
             ,true,true);
