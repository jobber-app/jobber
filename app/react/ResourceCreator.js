import React from "react";
import { observer } from "mobx-react";
import Modal from "./Modal";

@observer class ResourceCreator extends React.Component {
    constructor () {
        super();
        this.state = {
            creating: false,
            name: "",
            file: "",
        }
    }

    componentWillMount () {
        this.onStartCreate = this.props.onStartCreate || (() => {});
        this.onCancelCreate = this.props.onCancelCreate || (() => {});
        this.onFinishCreate = this.props.onFinishCreate || (() => {});
    }

    setCreating (value) {
        var newState = Object.assign({}, this.state);
        newState.creating = value;
        this.setState(newState);
    }

    startCreating () {
        this.onStartCreate();
        this.setCreating(true);
    }

    finishCreating () {
        this.onFinishCreate(this.props.parser.call(this));
        this.setCreating(false);
    }

    cancelCreating () {
        this.onCancelCreate();
        this.setCreating(false);
    }

    get form () { 
        // Whenever we go to creating mode, all elements are rerendered
        // This clears previous input values
        if (this.state.creating === false) return null;
        
        // Otherwise, as expected, return the form for rendering.
        return (
<form onSubmit={ e => { e.preventDefault(); this.finishCreating() } }>
    { this.props.children }
    <div class="w-100 d-flex justify-content-center mt-2">
        <div class="btn btn-danger mr-2"
             onClick={ this.cancelCreating.bind(this) }>
            Cancel
        </div>
        <button type="submit" class="btn btn-success">Continue</button>
    </div>
</form>
        )
    }

    render () {
        return (
<span class={ this.props.className }>
    <div class={ "btn btn-success m-1 " + (this.props.small ? "btn-sm" : "") }
         onClick={ this.startCreating.bind(this) }>
        Create New { this.props.subject }
    </div>
    <Modal title={ "Create a New " + this.props.subject }
           name={ "creator-" + this.props.subject.toLowerCase() }
           showing={ this.state.creating } 
           onClose={ this.cancelCreating.bind(this) }>
        { this.form }
    </Modal>
</span>
        )
    }
}

@observer class JobCreator extends ResourceCreator {}
JobCreator.defaultProps = {
    subject: "Job",
    className: "w-100 d-flex no-flex justify-content-center",
    children: (
        <input class="form-control" type="text" require="true"
               placeholder="Name for new job"/>
    )
} 

@observer class CVCreator extends ResourceCreator {}
CVCreator.defaultProps = {
    subject: "CV",
    className: "w-100 d-flex no-flex justify-content-center",
    children: (
        <div>
            <input class="form-control" type="text" require="true"
                   placeholder="CV Name"/>
            <p class="mt-3 mb-1">Choose CV PDF to upload...</p>
            <input class="w-100 mb-2" type="file" required="true"/>
        </div>
    )
}

export { JobCreator, CVCreator }
