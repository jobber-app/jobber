import React from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import store from "./store";
import { EditableCVPicker, EditableInput, EditableTextarea } from "./Editable";
import Modal from "./Modal";
import { CVsList } from "./List";
import $ from "jquery";

// Details component handles viewing and editing details of a given Job.
export default @observer class Details extends React.Component {
    constructor () {
        super()
        this.state = {
            editing: {}, // editing property of state serves as a map of what elements are currently being edited.
            sections: (new Array(this.sectionNames.length)).fill(false), //list of sections that are currently open
        };
        this.state.sections[0] = true;
    }
    sectionNames = ["Information", "Application", "Interviews", "Offers"]

    openSection (sectionIndex) {
        var newState = Object.assign({}, this.state);
        if (store.settings.splittable === true) newState.sections[sectionIndex] = true; // If splittable mode is active, keep other sections open
        else {
            newState.sections = (new Array(this.sectionNames.length)).fill(false);
            newState.sections[sectionIndex] = true;
        }
        this.setState(newState);
    }

    closeSection (sectionIndex) {
        var newState = Object.assign({}, this.state);
        newState.sections[sectionIndex] = false;
        // If there are no active sections after deactivation, revert deactivation
        if (newState.sections.every(a => !a)) return;
        // Otherwise, commit changes with setState
        this.setState(newState);
    }

    toggleSection (sectionIndex) {
        if (this.state.sections[sectionIndex] === true) return this.closeSection(sectionIndex);
        else                                        return this.openSection(sectionIndex);
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
    createEditable (propertyName, type = "input", title, large = false, editor) {
        var Type = type === "cv-picker" ? EditableCVPicker : type === "textarea" ? EditableTextarea : EditableInput;
        return (
            <Type title={ title }
                  large={ large }
                  data={ this.job[propertyName] }
                  editing={ this.state.editing[propertyName] }
                  changeEditing={ this.setEditing.bind(this, propertyName) }
                  onSave={ newValue => this.job[propertyName].set(newValue) }
                  editor={ editor }
            />
        );
    }

    createTabs () {
        var tabs = [];
        for (var ii in this.sectionNames) {
            var isActive = this.state.sections[ii];
            var activeClass = isActive ? "font-weight-bold active" : "";
            tabs[ii] = <a class={ "col-3 rounded-0 themed-button btn " + activeClass } 
                          onClick={ this.toggleSection.bind(this, ii) }
                          key={ ii }>
                           { this.sectionNames[ii] }
                       </a>
        }
        return tabs;
    }

    render () {
        return (
<div class="d-flex flex-column h-100">
    <div class="row rounded-top" style={{ overflow: "hidden" }}>{ this.createTabs() }</div>
    <div class="row d-flex flex-column" style={{ flex: "1 1 auto", height: 0 }}>
        <Section open={ this.state.sections[0] }>
            <p class="text-center">Preliminary information about the job obtained from its listing before you apply.</p>
            { this.createEditable("title",          "input",     "Position:",    true ) }
            { this.createEditable("employer",       "input",     "Employer:",    false) }
            { this.createEditable("description",    "textarea",  "Description:", false) }
        </Section>
        <Section open={ this.state.sections[1] }>
            <p class="text-center">Items relevant to the initial application process, such as your CV and cover letter.</p>
            { this.createEditable("cv",             "cv-picker", "CV:",          false) }
        </Section>
        <Section open={ this.state.sections[2] }>
            <p class="text-center">Interviews for the position, such as date/time and subject matter.</p>
            Int
        </Section>
        <Section open={ this.state.sections[3] }>
            <p class="text-center">The offer(s) you received for the application, and whether or not you took them.</p>
            Off
        </Section>
    </div>
</div>
        )
    }
}

@observer class Section extends React.Component {
    constructor () {
        super()
    }

    render () {
        return (
<div class="fluid-container" style={{ "overflowY": "scroll", padding: "5px", flex: "1 1 auto", height: 0, display: this.props.open ? "initial" : "none" }}>
    { this.props.children }
</div>
        )
    }
}
