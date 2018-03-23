import React from "react";
import { observer } from "mobx-react";
import Modal from "./Modal";

export default @observer class ResourceCreator extends React.Component {
    constructor () {
        super();
        this.state = {
            creating: false,
        }
    }

    componentWillMount () {
        this.onStartCreate = this.props.onStartCreate === undefined ? () => {console.log("undefined onStartCreate")} : this.props.onStartCreate; 
        this.onCancelCreate = this.props.onCancelCreate === undefined ? () => {console.log("e");} : this.props.onCancelCreate; 
        this.onFinishCreate = this.props.onFinishCreate === undefined ? () => {} : this.props.onFinishCreate; 
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
        this.onFinishCreate();
        this.setCreating(false);
    }

    cancelCreating () {
        this.onCancelCreate();
        this.setCreating(false);
    }

    render () {
        return (
<span>
    <div class="btn btn-success btn-lg m-1" onClick={ this.startCreating.bind(this) }>Create New { this.props.subject }</div>
    <Modal name={ "creator-" + this.props.subject.toLowerCase() } showing={ this.state.creating } onClose={ this.cancelCreating.bind(this) }>
        { this.children }
        <div class="btn btn-danger mr-2" onClick={ this.cancelCreating.bind(this) }>Cancel</div>
        <button type="submit" class="btn btn-success" onClick={ this.finishCreating.bind(this) } >Continue</button>
    </Modal>
</span>
        )
    }
}
