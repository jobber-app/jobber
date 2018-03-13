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
        console.log("id: ", this.props.match.params.id);
        return store.getJobById(parseInt(this.props.match.params.id));
    }

    render () {
        document.title = "Jobber | " + this.job.title.get().substring(0,20);
        return (
            <div>
<EditableInput title={<h5 className="m-0 mr-2">Position:</h5>} large={ true } data={ this.job.title } editing={ this.state.editing.title } changeEditing={ this.setEditing.bind(this, "title") } onSave={ newValue => { this.job.title.set(newValue) } }/>
<EditableInput title={<h6 className="m-0">Employer:</h6>} data={ this.job.employer } editing={ this.state.editing.employer } changeEditing={ this.setEditing.bind(this, "employer") } onSave={ newValue => { this.job.employer.set(newValue) } }/>
<EditableTextarea title={<h6 className="m-0">Description:</h6>} data={ this.job.description } editing={ this.state.editing.description } changeEditing={ this.setEditing.bind(this, "description") } onSave={ newValue => { this.job.description.set(newValue) } }/>
            </div>
        )
    }
}
