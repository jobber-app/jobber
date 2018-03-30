import React from "react";
import store from "./store";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import Modal from "./Modal";
import { CVCreator } from "./ResourceCreator";
import { CVsList } from "./List";
import Calendar from "react-calendar/dist/entry.nostyle";

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
       class={ "form-control " + this.largeClass } 
       value={ this.state.data } onBlur={ this.cancel.bind(this) }
       onKeyDown={ this.escapeOrEnter.bind(this) }
       onChange={ e => this.setLocalData(e.target.value) }
       />
            )
        } else {
            return (
<input ref={ input => this.input = input }
       type="text" 
       class={ "form-control form-control-plaintext " + this.largeClass }
       value={ this.props.data }
       onClick={ this.edit.bind(this) }
       onChange={ _ => {} } // onChange needed, readOnly gives default styling
       />
            )
        }
    }
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
          onBlur={ this.cancel.bind(this) } 
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
    get editor () {
        return (
null
        )
    }
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
        var text = "yes-flex h-100 form-control form-control-plaintext " +
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
