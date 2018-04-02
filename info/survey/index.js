function Section (id) {
    this.id = id;
    this.node = document.getElementById(this.id);

    var addButton = document.createElement("div");
    addButton.innerHTML = "Don't see your option? Click to add another.";
    addButton.className = "btn btn-outline-secondary btn-sm mt-2 w-100";
    addButton.addEventListener("click", this.newCustomInput.bind(this));
    this.addButton = addButton;
    this.node.appendChild(addButton);
}
Section.prototype.newCustomInput = function () {
    var container = document.createElement("div");
    container.className = "custom mt-2";

    var remove = document.createElement("div");
    remove.className = "remove btn btn-outline-danger";
    remove.addEventListener("click", this.node.removeChild.bind(this.node, container));
    remove.innerHTML = "&times;";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control form-control-sm";
    input.placeholder = "Enter new option here...";

    container.appendChild(remove);
    container.appendChild(input);
    this.node.insertBefore(container, this.addButton);

    input.focus();
}

new Section("how-tracking");
new Section("extra-documents");
new Section("document-creation-softwares");
