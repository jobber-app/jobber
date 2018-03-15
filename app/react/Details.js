import React from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import store from "./store";
import { EditableInput, EditableTextarea } from "./Editable.js";

// Details component handles viewing and editing details of a given Job.
export default @observer class Details extends React.Component {
    constructor () {
        super()
        this.state = {
            editing: {} // editing property of state serves as a map of what elements are currently being edited.
        };
    }

    componentWillMount () {
        autorun(() => this.resetEditing(this.props.match.params.id)); // When id changes, autorun detects it due to MobX observable wrapping on react properties
    }

    // Reset all editing properties, thereby eliminating unfinished edits
    resetEditing () {
        this.state.editing = {}
        this.setState(this.state);
    }

    // Set editing to true, enabling edits for an Editable of the page. Used for Editable upwards communication
    setEditing (inputName, editState = true) {
        this.state.editing[inputName] = editState;
        this.setState(this.state);
    }

    // gets the current job. Due to MobX observable, this will update when the this.props.match.params.id changes
    get job () {
        return store.getJobById(parseInt(this.props.match.params.id));
    }

    // creates an editable for a job property with the specific type and size, and automatically binds correct props
    createEditable (propertyName, type = "input", title, large = false) {
        var Type = type === "textarea" ? EditableTextarea : EditableInput;
        return (
            <Type title={ title }
                  large={ large }
                  data={ this.job[propertyName] }
                  editing={ this.state.editing[propertyName] }
                  changeEditing={ this.setEditing.bind(this, propertyName) }
                  onSave={ newValue => this.job[propertyName].set(newValue) }
            />
        );
    }

    render () {
        return (
            <div>
{ this.createEditable("title",          "input",    "Position:",    true ) }
{ this.createEditable("employer",       "input",    "Employer:",    false) }
{ this.createEditable("description",    "textarea", "Description:", false) }
            </div>
        )
    }
}
