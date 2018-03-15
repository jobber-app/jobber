import React from "react";
import store from "./store";
import { autorun, reaction } from "mobx";
import { observer } from "mobx-react";

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

    setLocalData (newData) {
        var newState = Object.assign({}, this.state);
        newState.data = newData;
        this.setState(newState);
    }

    edit () {
        this.setLocalData(this.props.data.get());
        this.input.focus();
        this.props.changeEditing(true);
    }

    save () {
        this.props.onSave(this.state.data);
        this.input.blur();
        this.props.changeEditing(false);
    }

    cancel () {
        this.setLocalData(this.props.data.get());
        this.input.blur();
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
        var titleEl = this.props.large ? <h5 className="m-0 mr-2">{ this.props.title }</h5> : <h6 className="m-0">{ this.props.title }</h6>
        return (
<div class={ "editableItem " + (this.inline ? "inline" : "") }>
    { this.props.title !== undefined ? (<div className="title">{ titleEl }</div>) : "" }
    { this.editor() }
    { !this.props.editing ? (
        <div className="controls ml-1">
            <button class="btn btn-success w-100 btn-sm" onClick={ this.edit.bind(this) }>Edit</button>
        </div>
    ) : (
        <div className="controls ml-1">
            <div className="btn-group w-100">
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
            <input ref={ input => this.input = input } type="text" class={ "form-control " + (this.props.large ? "form-control-lg" : "") } value={ this.state.data } onKeyDown={ this.escapeOrEnter.bind(this) } onChange={ e => this.setLocalData(e.target.value) } />
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
            <textarea ref={ input => this.input = input } type="text" style={{ height: 200, resize: "none" }} class="form-control" onKeyDown={ this.escapeOrEnter.bind(this) } onChange={ e => { this.setLocalData(e.target.value) } } value={ this.state.data }></textarea>
        ) : (
            <textarea ref={ input => this.input = input } type="text" style={{ height: 200, resize: "none" }} class="form-control form-control-plaintext" onClick={ this.edit.bind(this) } onChange={ () => { /*readOnly gives default bootstrap styling */ } } value={ this.props.data.get() }></textarea>
        ))
    }
}

export { EditableInput, EditableTextarea };
