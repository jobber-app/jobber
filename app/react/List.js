import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import store from "./store";

@observer class List extends React.Component {
    constructor () {
        super()
        this.state = {
            advanced: false,
            search: ""
        }
    }

    toggleAdvanced () {
        var newState = Object.assign({}, this.state);
        newState.advanced = !newState.advanced;
        this.setState(newState);
    }

    render () {
        var items = [];
        for (var ii in store.jobs) {
            items.push(<JobItem data={ store.jobs[ii] } />);
        }
        return (
<div className="d-flex flex-column h-100">   
    <div id="filter">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Filter by Name" id="search"/>
            <div className="input-group-append">
                <button class="btn btn-primary">Search</button>
            </div>
        </div>
        <div className="pt-1 btn-light w-100 text-center" style={{ "font-size": "10px", "font-family": "monospace", "cursor": "pointer" }}><a onClick={ this.toggleAdvanced.bind(this) }>Advanced Search { this.state.advanced ? "[-]" : "[+]" }</a></div>
        <div class={ "collapse pb-1 " + (this.state.advanced ? "show" : "") } id="advanced-search">
            <input type="checkbox" checked="true"/><label class="form-check-label">Planning Stage</label><br/>
            <input type="checkbox" checked="true"/><label class="form-check-label">Application Stage</label><br/>
            <input type="checkbox" checked="true"/><label class="form-check-label">Interviews Stage</label><br/>
            <input type="checkbox" checked="true"/><label class="form-check-label">Offer Stage</label><br/>
            <input type="checkbox" checked="true"/><label class="form-check-label">Archived</label><br/>
        </div>
    </div>
    <ul id="listItems" className="list-group active">{ items }</ul>
</div>
        )
    }
}

@observer class JobItem extends React.Component {
    render () {
        return <Link to={ "/jobs/" + this.props.data.id.get() } className={ "text-left d-flex flex-column justify-content-center m-1 btn alert-" + this.props.data.colour }><h5>{ this.props.data.title.get() }</h5><h6>{ this.props.data.employer.get() }</h6></Link>
    }
}

export default List;
