import React from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import store from "./store";
import { EditableCVPicker, EditableInput, EditableTextarea } from "./Editable";

// Details component handles viewing and editing details of a given Job.
export default @observer class Details extends React.Component {
    constructor () {
        super()
        this.state = {
            // "editing" maps what elements are currently being edited.
            editing: {}, 
            //list of sections that are currently open
            sections: (new Array(this.sectionNames.length)).fill(false), 
        };
        this.state.sections[0] = true;
    }
    sectionNames = ["Information", "Application", "Interviews", "Offers"]

    openSection (sectionIndex) {
        var newState = Object.assign({}, this.state);

        // If splittable mode is active, keep other sections open
        if (store.settings.splittable === true) {
            newState.sections[sectionIndex] = true;
        } else {
            newState.sections = (new Array(this.sectionNames.length));
            newState.sections.fill(false);
            newState.sections[sectionIndex] = true;
        }

        this.setState(newState);
    }

    closeSection (sectionIndex) {
        var newState = Object.assign({}, this.state);
        newState.sections[sectionIndex] = false;
        // If there are no active sections after deactivation, revert
        if (newState.sections.every(a => !a)) return;
        // Otherwise, commit changes with setState
        this.setState(newState);
    }

    toggleSection (sectionIndex) {
        if (this.state.sections[sectionIndex] === true) {
            return this.closeSection(sectionIndex);
        } else {
            return this.openSection(sectionIndex);
        }
    }

    componentWillMount () {
        // When id changes, autorun detects it due to MobX observable wrapping
        autorun(() => this.resetEditing(this.props.match.params.id)); 
    }

    // Reset all editing properties to false, thereby clearing unfinished edits
    resetEditing () {
        this.state.editing = {}
        this.setState(this.state);
    }

    // Set editing to true, enabling edits for an Editable of the page. 
    // Used for Editable upwards communication
    setEditing (inputName, editState = true) {
        this.state.editing[inputName] = editState;
        this.setState(this.state);
    }

    // gets the current job. 
    // Due to MobX observable, id will update with this.props.match.params.id
    get job () {
        var id = parseInt(this.props.match.params.id);
        return store.getJobById(id);
    }

    // Creates an editable for a job property with the specific type and size
    // then automatically binds correct props
    createEditable (property, type, title, large = false, editor) {
        var Type;
        switch (type) {
            case "cv-picker":
                Type = EditableCVPicker;
                break;
            case "textarea":
                Type = EditableTextarea;
                break;
            default:
                Type = EditableInput;
                break;
        }

        return (
            <Type title={ title }
                  large={ large }
                  data={ this.job[property] }
                  editing={ this.state.editing[property] }
                  changeEditing={ this.setEditing.bind(this, property) }
                  onSave={ newValue => this.job[property].set(newValue) }
                  editor={ editor }
            />
        );
    }

    // Create tabs for selecting sections
    createTabs () {
        var tabs = [];
        for (var ii in this.sectionNames) {
            var isActive = this.state.sections[ii] ? "active" : "";
            tabs[ii] = <a class={ "col-3 rounded-0 btn-themed " + isActive } 
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
    <div class="row rounded-top hide-overflow">{ this.createTabs() }</div>
    <div class="row d-flex flex-column yes-flex">
        <Section open={ this.state.sections[0] }>
            <p class="text-center">
                Preliminary information about the job obtained from its listing
                before you apply.
            </p>

            { /* Editable for title (large and inline input) */ }
            { this.createEditable("title",       
                                  "input",
                                  "Position:",
                                  true ) }
            { /* Editable for employer (small and inline input) */ }
            { this.createEditable("employer",
                                  "input",
                                  "Employer:",
                                  false) }
            { /* Editable for description (large and block textarea) */ }
            { this.createEditable("description", 
                                  "textarea",
                                  "Description:",
                                  false) }
        </Section>
        <Section open={ this.state.sections[1] }>
            <p class="text-center">
                Items relevant to the initial application process, such as your
                CV and cover letter.
            </p>

            { /* Picker for CV. */ }
            { this.createEditable("cv",
                                  "cv-picker",
                                  "CV:",
                                  false) }
        </Section>
        <Section open={ this.state.sections[2] }>
            <p class="text-center">
                Interviews for the position, such as date/time and subject
                matter.
            </p>
            Int
        </Section>
        <Section open={ this.state.sections[3] }>
            <p class="text-center">
                The offer(s) you received for the application, and whether or 
                not you took them.
            </p>
            Off
        </Section>
    </div>
</div>
        )
    }
}

// Section element, wraps section elements and toggles showing them
// Largely useful on CSS simplification.
@observer class Section extends React.Component {
    render () {
        return (
<div class={ "section " + (this.props.open ? "open" : "closed") }>
    { this.props.children }
</div>
        )
    }
}
