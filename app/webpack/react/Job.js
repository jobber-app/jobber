import React from "react";
import { observer } from "mobx-react";
import { autorun, observable } from "mobx";
import store from "./store";
import Editable from "./Editable";

// Details component handles viewing and editing details of a given Job.
export default @observer class Details extends React.Component {
    // "editing" shows what element is currently being edited.
    @observable editing = null;
    //section that is currently focused
    @observable section = null;

    constructor () {
        super()
        this.section = 0;
    }

    sectionNames = ["Information", "Application", "Interviews", "Offers"]

    setSection (newIndex) {
        if (newIndex === this.section) return;
        this.section = newIndex;
    }

    componentWillMount () {
        // When id changes, autorun detects it due to MobX observable wrapping
        autorun(() => this.resetEditing(this.props.id)); 
    }

    // Reset all editing properties to false, thereby clearing unfinished edits
    resetEditing () {
        this.editing = null;
    }

    // Set editing to true, enabling edits for an Editable of the page. 
    // Used for Editable upwards communication
    setEditing (inputName, editState = true) {
        if (editState === true) this.editing = inputName;
        else this.editing = null;
    }

    // gets the current job. 
    // Due to MobX observable, id will update with this.props.match.params.id
    get job () {
        var id = parseInt(this.props.id);
        return store.getJobById(id);
    }

    // Creates an editable for a job property with the specific type and size
    // then automatically binds correct props
    bindEditable (property, Type, additionalProps) {
        return (
            <Type { ...additionalProps }
                  data={ this.job[property] }
                  editing={ property === this.editing }
                  changeEditing={ this.setEditing.bind(this, property) }
                  onSave={ newValue => this.job[property].set(newValue) }
            />
        );
    }

    // Create tabs for selecting sections
    createTabs () {
        var tabs = [];
        for (var index in this.sectionNames) {
            let ii = parseInt(index);
            var isActive = this.section === ii ? "active" : "";
            tabs[ii] = <a class={ "col-3 rounded-0 btn-themed " + isActive } 
                          onClick={ this.setSection.bind(this, ii) }
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
        <Section open={ this.section === 0 }>
            <p class="text-center">
                Preliminary information about the job obtained from its listing
                before you apply.
            </p>

            { /* Editable for title (large and inline input) */ }
            { this.bindEditable("title",       
                                Editable.Input,
                                { title: "Position: " } 
                               ) }
            { /* Editable for employer (small and inline input) */ }
            { this.bindEditable("employer",
                                Editable.Input,
                                { title: "Employer: " }
                               ) }
            { /* Editable for description (large and block textarea) */ }
            { this.bindEditable("description", 
                                Editable.Textarea,
                                { title: "Description: " }
                               ) }
            { /* Editable for apply by date */ }
            { this.bindEditable("date",
                                Editable.MDate,
                                { title: "Date: " }
                               ) }
        </Section>
        <Section open={ this.section === 1 }>
            <p class="text-center">
                Items relevant to the initial application process, such as your
                CV and cover letter.
            </p>

            { /* Picker for CV. */ }
            { this.bindEditable("cv",
                                Editable.CVPicker,
                                { title: "CV: " }
                               ) }
        </Section>
        <Section open={ this.section === 2 }>
            <p class="text-center">
                Interviews for the position, such as date/time and subject
                matter.
            </p>
            Int
        </Section>
        <Section open={ this.section === 3 }>
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
