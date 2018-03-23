import React from "react";
import store from "./store";
import { autorun, reaction } from "mobx";
import { observer } from "mobx-react";
import Modal from "./Modal";
import { CVsList } from "./List";

@observer class Editable extends React.Component {
    constructor () {
        super();
        this.state = {
            data: ""
        }
    }

    componentWillMount () {
        this.inline = this.inline || this.props.inline;
        reaction(() => this.props.data.get(), data => this.setLocalData(data));
    }

    setLocalData (newData, autoSave) {
        var newState = Object.assign({}, this.state);
        newState.data = newData;
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

    render () {
        var titleEl = this.props.large ? <h5 class="m-0 mr-2">{ this.props.title }</h5> : <h6 class="m-0">{ this.props.title }</h6>
        return (
<div class={ "editableItem " + (this.inline ? "inline" : "") }>
    { this.props.title != undefined ? (<div class="title">{ titleEl }</div>) : "" }
    { this.editor() }
    { !this.props.editing ? (
        <div class="controls ml-1">
            <button class="btn btn-success w-100 btn-sm" onClick={ this.edit.bind(this) }>Edit</button>
        </div>
    ) : (
        <div class="controls ml-1">
            <div class="btn-group w-100">
                <button class="btn btn-success w-50 btn-sm" onClick={ this.save.bind(this) }>Save</button>
                <button class="btn btn-danger w-50 btn-sm" onClick={ this.cancel.bind(this) }>Reset</button>
            </div>
        </div>
    ) }
</div>
        );
    }
}

@observer class EditableInput extends Editable {
    inline = true;

    editor () {
        return (this.props.editing ? (
            <input ref={ input => this.input = input } type="text" class={ "form-control " + (this.props.large ? "form-control-lg" : "") } value={ this.state.data } onBlur={ this.cancel.bind(this) } onKeyDown={ this.escapeOrEnter.bind(this) } onChange={ e => this.setLocalData(e.target.value) } />
        ) : (
            <input ref={ input => this.input = input } type="text" class={ "form-control form-control-plaintext " + (this.props.large ? "form-control-lg" : "") }  value={ this.props.data } onClick={ this.edit.bind(this) } onChange={ () => { /*readOnly gives default bootstrap styling */ } }/>
        ))
    }
}

@observer class EditableTextarea extends Editable {
    inline = false;
    enter (e) {
        if (e.keyCode === 13 && e.ctrlKey === true) {
            this.save();
            e.preventDefault();
        }
    }

    editor () {
        return (this.props.editing ? (
            <textarea ref={ input => this.input = input } type="text" class="form-control editor editing" onBlur={ this.cancel.bind(this) } onKeyDown={ this.escapeOrEnter.bind(this) } onChange={ e => { this.setLocalData(e.target.value) } } value={ this.state.data }></textarea>
        ) : (
            <textarea ref={ input => this.input = input } type="text" class="form-control form-control-plaintext editor" onClick={ this.edit.bind(this) } onChange={ () => { /*readOnly gives default bootstrap styling */ } } value={ this.props.data.get() }></textarea>
        ))
    }
}

@observer class EditableCVPicker extends Editable {
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

    inline = true;

    customEdit   () { this.openModal(); }
    customCancel () { this.closeModal(); }
    customSave   () { this.closeModal(); }

    editor () {
        var cv = (this.props.editing ? (
            store.getCVById(this.state.data)
        ) : (
            store.getCVById(this.props.data.get())
        ))
        return (
            <div class="w-100">
                <input readOnly="true" onClick={ this.edit.bind(this) } class={ "form-control form-control-plaintext " + (this.props.large ? "form-control-lg" : "") } value={ cv !== undefined ? cv.name.get() : "No CV selected" }/>
                <Modal name="cv-picker" title="Pick a CV" showing={ this.state.modalOpen } onClose={ this.cancel.bind(this) }>
                    <CVsList onSelect={ newId => this.setLocalData(newId, true) }
                             />
                </Modal>
            </div>
        )
    }
}
export { EditableInput, EditableTextarea, EditableCVPicker };
