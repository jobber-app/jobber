import React from "react";
import store from "./store";
import { observable, reaction } from "mobx";
import { observer } from "mobx-react";
import Modal from "./Modal";
import { CVCreator } from "./ResourceCreator";
import { CVsList } from "./List";

@observer class Editable extends React.Component {
    constructor () {
        super();
        this.state = {
            data: ""
        }
    }

    componentWillMount () {
        this.inline = this.props.inline ? "inline" : "";
        // Set up a reaction: When prop.data changes, setLocalData
        // IMPORTANT: Consider when props change but editing mode is on
        reaction(() => this.props.data.get(), data => this.setLocalData(data));
        this.setLocalData(this.props.data.get());
    }

    setLocalData (newData, autoSave) {
        var newState = Object.assign({}, this.state);
        newState.data = newData;
        // If the autoSave flag is set, call save as a callback on setState
        this.setState(newState, autoSave ? this.save : () => {});
    }

    edit () {
        this.setLocalData(this.props.data.get());
        if (this.input) this.input.focus();
        if (this.customEdit) this.customEdit();
        this.props.changeEditing(true);
    }

    save () {
        this.props.onSave(this.state.data);
        if (this.input) this.input.blur();
        if (this.customSave) this.customSave();
        this.props.changeEditing(false);
    }

    cancel () {
        this.setLocalData(this.props.data.get());
        if (this.input) this.input.blur();
        if (this.customCancel) this.customCancel();
        this.props.changeEditing(false);
    }

    enter (e) {
        if (e.keyCode === 13) {
            this.save();
            e.preventDefault();
        }
    }

    escape (e) {
        if (e.keyCode === 27) {
            this.cancel();
            e.preventDefault();
        }
    }

    escapeOrEnter (e) {
        this.enter(e);
        this.escape(e);
    }

    get editText () {
        return this.props.editText || "Edit";
    }

    get title () {
        if (this.props.title == undefined) return null;

        if (this.props.large) {
            var t = <h5 class="m-0 mr-2">{ this.props.title }</h5>
        } else {
            var t = <h6 class="m-0">{ this.props.title }</h6>
        }
        return <div class="title">{ t }</div>
    }

    get editButtons () {
        if (this.props.editing) {
            return (
<div class="controls ml-1">
    <div class="btn-group w-100">
        <button class="btn btn-success w-50 btn-sm"
                onClick={ this.save.bind(this) }>
            Save
        </button>
        <button class="btn btn-danger w-50 btn-sm"
                onClick={ this.cancel.bind(this) }>
            Reset
        </button>
    </div>
</div>
            )
        } else {
            return (
<div class="controls ml-1">
    <button class="btn btn-success w-100 btn-sm" 
            onClick={ this.edit.bind(this) }>
        { this.editText }
    </button>
</div>
            )
        }
    }

    render () {
        return (
<div class={ "editableItem " + this.inline }>
    { this.title }
    { this.editor }
    { this.editButtons }
</div>
        );
    }
}
Editable.defaultProps = {
    inline: true,
}

@observer class Input extends Editable {
    get largeClass () {
        if (!this.props.large) return "";
        return "form-control-lg";
    }

    get editor () {
        if (this.props.editing) {
            return (
<input ref={ input => this.input = input } 
       type="text"
       class={ "form-control " + this.props.className } 
       value={ this.state.data } 
       onBlur={ this.save.bind(this) }
       onKeyDown={ this.escapeOrEnter.bind(this) }
       onChange={ e => this.setLocalData(e.target.value) }
       />
            )
        } else {
            return (
<input ref={ input => this.input = input }
       type="text" 
       class={ "form-control form-control-plaintext " + this.props.className }
       style={ this.props.style }
       value={ this.props.data }
       onClick={ this.edit.bind(this) }
       onChange={ _ => {} } // onChange needed, readOnly gives default styling
       />
            )
        }
    }
}

@observer class RawInput extends Input {
    get editButtons () { return null; }
    get title () { return null; }
    render () { return this.editor; }
}

@observer class Textarea extends Editable {
    enter (e) {
        if (e.keyCode === 13 && e.ctrlKey === true) {
            this.save();
            e.preventDefault();
        }
    }

    get editor () {
        if (this.props.editing) {
            return (
<textarea ref={ input => this.input = input } 
          type="text" 
          class="form-control editor editing" 
          onBlur={ this.save.bind(this) } 
          onKeyDown={ this.escapeOrEnter.bind(this) } 
          onChange={ e => this.setLocalData(e.target.value) } 
          value={ this.state.data }
          ></textarea>
            )
        } else {
            return (
<textarea ref={ input => this.input = input } 
          type="text" 
          class="form-control form-control-plaintext editor" 
          onClick={ this.edit.bind(this) } 
          onChange={ _ => {} } // onChange needed, readOnly gives default styling
          value={ this.props.data.get() }
          ></textarea>
            )
        }
    }
}
Textarea.defaultProps = {
    inline: false,
}

@observer class EditableModal extends Editable {
    constructor () {
        super();
        this.state.modalOpen = false;
    }

    setModalOpen (value) {
        var newState = Object.assign({}, this.state);
        newState.modalOpen = value;
        this.setState(newState);
    }

    openModal   () { this.setModalOpen(true); }
    closeModal  () { this.setModalOpen(false); }
    toggleModal () { this.setModalOpen(!this.state.modalOpen); }

    customEdit   () { this.openModal(); }
    customCancel () { this.closeModal(); }
    customSave   () { this.closeModal(); }
}

@observer class MDate extends EditableModal {
    // For formatting the date into a pretty readable format
    get prettyDay () {
        var date = this.state.data;
        var year = date.getFullYear().toString();
        var months = ["January", "February", "March", 
                      "April", "May", "June", "July", 
                      "August", "September", "October", 
                      "November", "December"];
        var month = months[date.getMonth()];
        var rawDay = date.getDate();
        // Pick a day suffix, th as default and override for 1st, 2nd, 3rd
        var daySuffix = "th";
        if (rawDay <= 3) daySuffix = (["st","nd","rd"])[rawDay-1];
        var day = rawDay.toString() + daySuffix;
        
        if (store.settings.yankeeDates) return `${month} ${day}, ${year}`;
        else                            return `${day} ${month}, ${year}`;
    }

    get prettyTime () {
        var date = this.state.data;
        var HH = date.getHours().toString().padStart(2, "0");
        var MM = date.getMinutes().toString().padStart(2, "0");
        var SS = date.getSeconds().toString().padStart(2, "0");

        return `${HH}:${MM}:${SS}`;
    }

    get prettyDayOfWeek () {
        var date = this.state.data;
        var daysOfWeek = [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
        ]
        return daysOfWeek[date.getDay()];
    }

    get prettyDate () {
        return this.prettyDayOfWeek + " " + this.prettyDay + ", " + this.prettyTime;
    }


    // stores the dom elements of each input
    inputs = {}
    // blur all of the elements in sequence
    blurAll () {
        var inputs = Object.values(this.inputs);
        inputs.map(i => i.blur());
    }
    // Checks if any of the input dom elements are focused
    anyFocused () {
        var inputs = Object.values(this.inputs);
        return inputs.some(i => i === document.activeElement);
    }
    // focus the first element, the year, for when no element has been clicked
    focusFirst () {
        this.inputs["year"].focus();
    }

    // Maps preferred names to Date method parts
    // e.g. year to FullYear
    propMap = {
        "year": "FullYear",
        "month": "Month",
        "day": "Date",
        "hour": "Hours",
        "minute": "Minutes",
        "second": "Seconds",
    }

    //withdraws the property corresponding to the name
    //sanitizes and pads it correctly
    getProp (name, length = 2) {
        var prop = this.propMap[name];
        var no = this.state.data["get" + prop]();

        if (name === "month") no += 1;

        var str = no.toString().padStart(length, "0");
        return str;
    }
    //writes new value to the relevant prop in the date
    setProp (name, e) {
        var prop = this.propMap[name];
        var newValue = parseInt(e.target.value);

        // If no meaningful value can be discerned, abort setting prop
        if (isNaN(newValue)) return;
        
        if (name === "month") newValue -= 1;
        
        var newDate = new Date(this.state.data.getTime());
        newDate["set" + prop](newValue);
        this.setLocalData(newDate);
    }

    boundInput (name, size="sm", props={}) {
        if (typeof props.className !== "string") props.className = "";
        props.className += " form-control p-0 text-center no-flex ";
        props.className += this.props.editing ? "" : " form-control-plaintext ";
        props.className += size;

        props.onChange = this.setProp.bind(this, name);
        props.onKeyDown = this.escapeOrEnter.bind(this);
        props.onClick = this.edit.bind(this);

        props.ref = input => this.inputs[name] = input;

        props.type = "text";

        var length = size === "lg" ? 4 : 2;
        props.maxLength = length;

        if (this.props.editing) {
            return (
<input defaultValue={ this.getProp(name, length) }
       { ...props }
       />
            )
        } else {
            return (
<input value={ this.getProp(name, length) }
       { ...props }
       />
            )
        }
    }

    // When leaving, blur all items
    customSave () { this.blurAll(); }
    customCancel () { this.blurAll(); }

    // If there is no focused input element, focus on year
    customEdit () {
        if (this.anyFocused() === false) this.focusFirst();
    }

    checkFullBlur (e) {
        // Set a delay, then check if the focused element is still an input
        setTimeout(() => {
            if (this.anyFocused() === false) this.save();
        }, 100)
    }

    get editor () {
        return (
<div class="date-editor yes-flex-horizontal input-group"
     onBlur={ this.checkFullBlur.bind(this) }
     >
    { this.boundInput("year", "lg", { placeholder: "YYYY" }) }
    <span>/</span>
    { this.boundInput("month", "md", { placeholder: "MM" }) }
    <span>/</span>
    { this.boundInput("day", "md", { placeholder: "DD" }) }
    <span class="pr-2">,</span>
    { this.boundInput("hour", "sm", { placeholder: "hh" }) }
    <span>:</span>
    { this.boundInput("minute", "sm", { placeholder: "mm" }) }
    <span>:</span>
    { this.boundInput("second", "sm", { placeholder: "ss" }) }
    <span class="mr-4"></span>
    <div class="yes-flex" onClick={ this.edit.bind(this) }>
        ({ this.prettyDate })
    </div>
</div>
        )
    }
}
MDate.defaultProps = {
    inline: true,
}

@observer class CVPicker extends EditableModal {
    setNewId (newId) {
        this.setLocalData(newId, true);
    }

    get editButtons () {
        return (
            <CVCreator small="true"
                       class=""
                       subject="CV"
                       onFinishCreate={ this.setNewId.bind(this) }
                       parser={ _ => 93}
                       />
        )
    }

    get editor () {
        if (this.props.editing) {
            var cv = store.getCVById(this.state.data);
        } else {
            var cv = store.getCVById(this.props.data.get());
        }
        var text = "yes-flex-horizontal h-100 form-control form-control-plaintext " +
                   (this.props.large ? "form-control-lg" : "");
        return (
<div class="w-100 d-flex align-items-center">
    <div class={ text }>
        { cv !== undefined ? cv.name.get() : "No CV selected" }
    </div>
    <div class="controls ml-1">
        <button class="btn btn-success w-100 btn-sm" 
                onClick={ this.edit.bind(this) }>
            Select Existing CV
        </button>
    </div>
    <Modal name="cv-picker" title="Pick a CV"
           showing={ this.state.modalOpen } 
           onClose={ this.cancel.bind(this) }>
        <div class="h-100 d-flex flex-column" style={{ "minHeight": "60vh" }}>
            <CVsList onSelect={ newId => this.setLocalData(newId, true) }/>
        </div>
    </Modal>
</div>
        )
    }
}
export default { Input, Textarea, MDate, CVPicker };
